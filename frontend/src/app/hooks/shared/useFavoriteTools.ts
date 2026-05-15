import { MouseEvent } from 'react';
import { useSettings } from '../../context/SettingsContext';
import SidebarItems from '../../utils/shared/SidebarItems';
import { MAX_FAVORITE_TOOLS } from '../../utils/settings/VaultToolboxSettings';

export default function useFavoriteTools() {
    const { settings, setFavorite } = useSettings();

    /** Returns whether the given page is currently marked as a favorite. */
    const isFavorite = (pageId: string) => !!settings[pageId]?.favorite;

    /** Toggles the favorited state for the given page. */
    const toggleFavorite = (pageId: string) => setFavorite(pageId, !isFavorite(pageId));

    /**
     * Click handler for the favorite star. Stops navigation (since the star
     * is nested inside a `<RouteLink>` row) before toggling the favorite setting.
     */
    const handleFavoriteClick = (pageId: string) => (event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        toggleFavorite(pageId);
    };

    // Categorize tools (always shown, favorites, remainder)
    const alwaysShownTools = SidebarItems.filter((tool) => tool.alwaysShow);
    const favoriteTools = SidebarItems.filter(
        (tool) => tool.pageId && !tool.alwaysShow && isFavorite(tool.pageId),
    ).sort(
        (firstTool, secondTool) =>
            // Sort favorites based on display order
            (settings[firstTool.pageId!]?.displayOrder ?? 0) - (settings[secondTool.pageId!]?.displayOrder ?? 0),
    );
    const remainingTools = SidebarItems.filter((tool) => tool.pageId && !tool.alwaysShow && !isFavorite(tool.pageId));

    // Collapsed sidebar should only display always shown and favorite tools
    const collapsedSidebarItems = [...alwaysShownTools, ...favoriteTools];

    const hasMoreTools = SidebarItems.some(
        (tool) =>
            tool.pageId && !tool.alwaysShow && settings[tool.pageId]?.enabled !== false && !isFavorite(tool.pageId),
    );
    const isFavoriteLimitReached = favoriteTools.length >= MAX_FAVORITE_TOOLS;

    return {
        isFavorite,
        setFavorite,
        toggleFavorite,
        handleFavoriteClick,
        alwaysShownTools,
        favoriteTools,
        remainingTools,
        collapsedSidebarItems,
        hasMoreTools,
        isFavoriteLimitReached,
    };
}
