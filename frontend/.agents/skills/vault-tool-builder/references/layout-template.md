# Vault Tool Builder: Layout Templates

## Tool Page Boilerplate (`src/app/pages/[Feature]Page.tsx`)

```tsx
import { VStack, Flex, Spacer, Heading, Box } from '@chakra-ui/react';
import { Panel, PanelGroup } from 'react-resizable-panels';
import VaultInfoIsland from '../components/shared/VaultInfoIsland';
import TelemetryData from '../components/shared/TelemetryData';
import VerticalResizeHandle from '../components/shared/VerticalResizeHandle';
import [Feature]Island from '../components/[feature-name]/[Feature]Island';
import [Feature]HeaderRow from '../components/[feature-name]/[Feature]HeaderRow';
import use[Feature] from '../hooks/[feature-name]/use[Feature]';

export default function [Feature]Page() {
    const { telemetryData, ...props } = use[Feature]();

    return (
        <VStack height='100vh' backgroundColor='veeva_light_gray_color_mode' gap={0} flex={1}>
            {/* 1. Header Row (Sibling to Island) */}
            <[Feature]HeaderRow {...props} />

            {/* 2. Main Tool Island (White Box) */}
            <Flex flex={1} width='100%' overflow='hidden'>
                <PanelGroup direction='horizontal'>
                    <Panel defaultSize={75} minSize={20}>
                        <[Feature]Island {...props} />
                    </Panel>
                    
                    {/* 3. Side Panel (Optional/Collapsible) */}
                    <VerticalResizeHandle />
                    <Panel defaultSize={25} minSize={10} collapsible>
                        <Box bg='white_color_mode' height='100%' borderLeft='1px solid' borderColor='gray.200'>
                            {/* Side Panel Content */}
                        </Box>
                    </Panel>
                </PanelGroup>
            </Flex>

            {/* 4. Status Island (Fixed Bottom) */}
            <VaultInfoIsland>
                <TelemetryData telemetryData={telemetryData} />
            </VaultInfoIsland>
        </VStack>
    );
}
```

## Tool Island Boilerplate (`src/app/components/[feature-name]/[Feature]Island.tsx`)

```tsx
import { Box } from '@chakra-ui/react';

export default function [Feature]Island() {
    return (
        <Box 
            flex={1} 
            margin='0px 10px 5px 10px' 
            bg='white_color_mode' 
            borderRadius='8px' 
            boxShadow='0 0 5px rgba(0,0,0,0.25)'
            height='calc(100% - 5px)'
            overflow='auto'
        >
            {/* Workload goes here */}
        </Box>
    );
}
```
