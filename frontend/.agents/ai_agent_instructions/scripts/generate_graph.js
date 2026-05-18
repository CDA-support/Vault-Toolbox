const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const glob = require('glob');

const CONFIG = {
  // We scan the 'src' directory
  srcDir: 'src', 
  // We output the graph into the instructions folder
  outputFile: '.agents/ai_agent_instructions/codebase_graph.json',
  // Ignore the instructions folder itself and tests
  ignore: ['.agents/ai_agent_instructions/**', '**/*.test.js', '**/*.test.tsx', '**/*.d.ts']
};

function generateGraph() {
  console.log('🕸️  Generating Codebase Knowledge Graph...');
  
  // Find all code files
  const files = glob.sync(`${CONFIG.srcDir}/**/*.{js,jsx,ts,tsx}`, {
    ignore: CONFIG.ignore
  });

  const graph = {
    metadata: {
      generatedAt: new Date().toISOString(),
      fileCount: files.length
    },
    nodes: [],
    edges: []
  };

  files.forEach(file => {
    const code = fs.readFileSync(file, 'utf-8');
    // Normalize path to forward slashes for consistency
    const relativePath = path.relative(process.cwd(), file).split(path.sep).join('/');
    
    // 1. Create a Node for the File itself
    const fileNode = { 
      id: relativePath, 
      type: 'FILE',
      extension: path.extname(file),
      exports: []
    };
    graph.nodes.push(fileNode);

    try {
      const ast = parser.parse(code, {
        sourceType: 'module',
        plugins: [
          'jsx', 
          'typescript', 
          'decorators-legacy', 
          'classProperties',
          'exportDefaultFrom'
        ]
      });

      traverse(ast, {
        // 2. Identify Exports (Components, Functions, Hooks)
        ExportNamedDeclaration(pathNode) {
          if (pathNode.node.declaration) {
            if (pathNode.node.declaration.type === 'FunctionDeclaration') {
              const name = pathNode.node.declaration.id.name;
              fileNode.exports.push({ name, type: 'FUNCTION' });
              addEntityNode(graph, relativePath, name, 'FUNCTION');
            }
            else if (pathNode.node.declaration.type === 'VariableDeclaration') {
              pathNode.node.declaration.declarations.forEach(decl => {
                let type = 'VARIABLE';
                if (decl.id.name && /^[A-Z]/.test(decl.id.name)) type = 'COMPONENT';
                if (decl.id.name && /^use/.test(decl.id.name)) type = 'HOOK';
                
                fileNode.exports.push({ name: decl.id.name, type });
                addEntityNode(graph, relativePath, decl.id.name, type);
              });
            }
            else if (pathNode.node.declaration.type === 'ClassDeclaration') {
              const name = pathNode.node.declaration.id.name;
              fileNode.exports.push({ name, type: 'CLASS' });
              addEntityNode(graph, relativePath, name, 'CLASS');
            }
          }
        },
        
        ExportDefaultDeclaration(pathNode) {
          let name = 'default';
          let type = 'UNKNOWN';
          
          if (pathNode.node.declaration.type === 'Identifier') {
            name = pathNode.node.declaration.name;
          } else if (pathNode.node.declaration.type === 'FunctionDeclaration') {
            name = pathNode.node.declaration.id ? pathNode.node.declaration.id.name : 'AnonymousFunction';
            type = 'FUNCTION';
          } else if (pathNode.node.declaration.type === 'ClassDeclaration') {
            name = pathNode.node.declaration.id ? pathNode.node.declaration.id.name : 'AnonymousClass';
            type = 'CLASS';
          }
          
          if (/^[A-Z]/.test(name)) type = 'COMPONENT';
          if (/^use/.test(name)) type = 'HOOK';

          fileNode.exports.push({ name, type });
          addEntityNode(graph, relativePath, name, type);
        },

        // 3. Identify Imports (Relationships between files)
        ImportDeclaration(pathNode) {
          const importSource = pathNode.node.source.value;
          
          // Resolve the import path relative to the current file
          let targetPath = resolveImportPath(file, importSource);
          
          if (targetPath) {
            graph.edges.push({
              source: relativePath,
              target: targetPath,
              relation: 'IMPORTS'
            });
          }
        }
      });

    } catch (e) {
      // Create a simplified node for files we can't fully parse
      // console.warn(`⚠️  Parser warning for ${relativePath}: ${e.message}`);
    }
  });

  // Ensure directories exist
  [CONFIG.outputFile, '.agents/ai_agent_instructions/repo_map.md'].forEach(file => {
    const dir = path.dirname(file);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });

  fs.writeFileSync(CONFIG.outputFile, JSON.stringify(graph, null, 2));
  console.log(`✅ Graph saved to ${CONFIG.outputFile} (${graph.nodes.length} nodes, ${graph.edges.length} edges)`);

  // --- Skill Manifest Generation ---
  generateSkillsManifest();

  // --- PageRank and Repo Map Generation ---
  const fileNodes = graph.nodes.filter(n => n.type === 'FILE');
  const importEdges = graph.edges.filter(e => e.relation === 'IMPORTS');
  
  const ranks = calculatePageRank(fileNodes, importEdges);
  generateRepoMap(fileNodes, ranks);
}

function generateSkillsManifest() {
  const skillsDir = '.agents/skills';
  const outputFile = '.agents/ai_agent_instructions/skills.md';
  
  if (!fs.existsSync(skillsDir)) return;

  const skillFiles = glob.sync(`${skillsDir}/**/SKILL.md`);
  let md = '# 🛠️ Agent Skills Manifest\n';
  md += `*Generated at: ${new Date().toLocaleString()}*\n`;
  md += '*DO NOT EDIT. This file is automatically generated for on-demand skill discovery.*\n\n';

  skillFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const relativePath = path.relative(process.cwd(), file).split(path.sep).join('/');
    
    // Simple YAML parser for frontmatter
    const yamlMatch = content.match(/^---\s*\n([\s\S]*?)\n---/);
    if (yamlMatch) {
      const yamlContent = yamlMatch[1];
      const metadata = {};
      yamlContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          metadata[key.trim()] = valueParts.join(':').trim();
        }
      });

      if (metadata.name) {
        md += `## [${metadata.name}](${relativePath})\n`;
        md += `- **Description:** ${metadata.description || 'No description provided.'}\n`;
        
        // Extract triggers (handling YAML list format)
        const triggersMatch = yamlContent.match(/triggers:\s*\n([\s\S]*?)(?:\n\w+:|$)/);
        if (triggersMatch) {
          const triggers = triggersMatch[1]
            .split('\n')
            .map(line => line.replace(/^[-\s]+/, '').trim())
            .filter(t => t.length > 0)
            .join(', ');
          if (triggers) md += `- **Triggers:** ${triggers}\n`;
        }
        md += '\n';
      }
    }
  });

  fs.writeFileSync(outputFile, md);
  console.log(`✅ Skills Manifest saved to ${outputFile}`);
}

function calculatePageRank(nodes, edges, iterations = 20, d = 0.85) {
  const nodeIds = nodes.map(n => n.id);
  const N = nodeIds.length;
  let ranks = {};
  nodeIds.forEach(id => ranks[id] = 1 / N);

  const adjacencyList = {};
  const outDegree = {};
  nodeIds.forEach(id => {
    adjacencyList[id] = [];
    outDegree[id] = 0;
  });

  edges.forEach(edge => {
    if (adjacencyList[edge.target] && adjacencyList[edge.source]) {
      adjacencyList[edge.target].push(edge.source);
      outDegree[edge.source]++;
    }
  });

  for (let i = 0; i < iterations; i++) {
    let newRanks = {};
    let sinkRank = 0;
    nodeIds.forEach(id => {
      if (outDegree[id] === 0) sinkRank += ranks[id];
    });

    nodeIds.forEach(id => {
      let rankSum = 0;
      adjacencyList[id].forEach(neighbor => {
        rankSum += ranks[neighbor] / outDegree[neighbor];
      });
      newRanks[id] = (1 - d) / N + d * (rankSum + sinkRank / N);
    });
    ranks = newRanks;
  }
  return ranks;
}

function generateRepoMap(nodes, ranks) {
  const sortedNodes = nodes
    .map(n => ({ ...n, rank: ranks[n.id] || 0 }))
    .sort((a, b) => b.rank - a.rank);

  const outputFile = '.agents/ai_agent_instructions/repo_map.md';
  let md = '# 🗺️ Vault Toolbox Repo Map (PageRank Sorted)\n\n';
  md += `*Generated at: ${new Date().toLocaleString()}*\n`;
  md += `*Total Files: ${nodes.length}*\n\n`;

  md += '## 🏗️ Architectural Backbone (Top 20%)\n';
  const topCount = Math.ceil(sortedNodes.length * 0.2);
  const topNodes = sortedNodes.slice(0, topCount);
  const restNodes = sortedNodes.slice(topCount);

  topNodes.forEach(node => {
    md += `### 📄 ${node.id} (Score: ${node.rank.toFixed(4)})\n`;
    if (node.exports && node.exports.length > 0) {
      md += '  - **Exports:** ' + node.exports.map(e => `\`${e.name}\``).join(', ') + '\n';
    }
    md += '\n';
  });

  md += '## 📂 Project Structure (Remainder)\n';
  // Simple tree-like view for the rest
  const tree = {};
  restNodes.forEach(node => {
    const parts = node.id.split('/');
    let curr = tree;
    parts.forEach((part, i) => {
      if (i === parts.length - 1) {
        curr[part] = node;
      } else {
        curr[part] = curr[part] || {};
        curr = curr[part];
      }
    });
  });

  function renderTree(obj, depth = 0) {
    let output = '';
    const indent = '  '.repeat(depth);
    Object.keys(obj).sort().forEach(key => {
      if (obj[key].id) {
        output += `${indent}- ${key}\n`;
      } else {
        output += `${indent}- **${key}/**\n`;
        output += renderTree(obj[key], depth + 1);
      }
    });
    return output;
  }

  md += renderTree(tree);

  fs.writeFileSync(outputFile, md);
  console.log(`✅ Repo Map saved to ${outputFile}`);
}

function addEntityNode(graph, filePath, name, type) {
  if (!name) return;
  const entityId = `${filePath}#${name}`;
  
  // Add Entity Node
  graph.nodes.push({ id: entityId, name, type, parentFile: filePath });
  
  // Link Entity to File
  graph.edges.push({ source: filePath, target: entityId, relation: 'DEFINES' });
}

// Helper to resolve generic import paths like './utils' to real files 'src/utils.js'
function resolveImportPath(currentFile, importPath) {
  if (!importPath.startsWith('.')) return null; // Skip node_modules

  const dir = path.dirname(currentFile);
  const extensions = ['.js', '.jsx', '.ts', '.tsx', '/index.js', '/index.jsx'];
  
  const exactPath = path.join(dir, importPath);
  
  // Try exact match first (rare in JS imports)
  if (fs.existsSync(exactPath)) return path.relative(process.cwd(), exactPath).split(path.sep).join('/');

  // Try extensions
  for (let ext of extensions) {
    const testPath = `${exactPath}${ext}`;
    if (fs.existsSync(testPath)) {
      return path.relative(process.cwd(), testPath).split(path.sep).join('/');
    }
  }
  return null;
}

generateGraph();