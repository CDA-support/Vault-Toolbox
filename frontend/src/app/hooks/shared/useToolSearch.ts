import { useState } from 'react';
import { SidebarItem } from '../../utils/shared/SidebarItems';

export default function useToolSearch() {
    const [userSearchInput, setUserSearchInput] = useState('');

    /**
     * Returns the subset of `tools` whose names match the current user search
     * input (case-insensitive substring). Returns the full list when the input is empty.
     */
    const filterTools = (tools: SidebarItem[]): SidebarItem[] => {
        const trimmedUserSearchInput = userSearchInput.trim();
        if (!trimmedUserSearchInput) return tools;
        const lowercasedSearchInput = trimmedUserSearchInput.toLowerCase();
        return tools.filter((tool) => tool.name.toLowerCase().includes(lowercasedSearchInput));
    };

    return { userSearchInput, setUserSearchInput, filterTools };
}
