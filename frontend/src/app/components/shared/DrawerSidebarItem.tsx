import { IconButton, IconButtonProps, Text } from '@chakra-ui/react';
import { PiStarFill } from 'react-icons/pi';
import useFavoriteTools from '../../hooks/shared/useFavoriteTools';
import { SidebarItem as SidebarItemType } from '../../utils/shared/SidebarItems';
import SidebarItem from './SidebarItem';
import { Tooltip } from './ui-components/tooltip';
import { MAX_FAVORITE_TOOLS } from '../../utils/settings/VaultToolboxSettings';

interface DrawerSidebarItemProps {
    tool: SidebarItemType;
    currentRoute: string;
    onClose: () => void;
}

export default function DrawerSidebarItem({ tool, currentRoute, onClose }: DrawerSidebarItemProps) {
    const { isFavorite, handleFavoriteClick, isFavoriteLimitReached } = useFavoriteTools();

    return (
        <SidebarItem item={tool} currentRoute={currentRoute} onClose={onClose}>
            <Text marginLeft={4} fontSize='lg' flex={1}>
                {tool.name}
            </Text>
            {tool.pageId && (
                <Tooltip
                    content={
                        isFavorite(tool.pageId)
                            ? 'Unfavorite'
                            : isFavoriteLimitReached
                              ? `Maximum of ${MAX_FAVORITE_TOOLS} favorites reached`
                              : 'Favorite'
                    }
                    openDelay={0}
                    positioning={{ placement: 'right' }}
                >
                    <IconButton
                        {...FavoriteButtonStyle}
                        disabled={!isFavorite(tool.pageId) && isFavoriteLimitReached}
                        color={isFavorite(tool.pageId) ? 'blue_color_mode' : undefined}
                        opacity={isFavorite(tool.pageId) ? 1 : 0.3}
                        aria-label={isFavorite(tool.pageId) ? 'Unfavorite' : 'Favorite'}
                        onClick={handleFavoriteClick(tool.pageId)}
                    >
                        <PiStarFill />
                    </IconButton>
                </Tooltip>
            )}
        </SidebarItem>
    );
}

const FavoriteButtonStyle: IconButtonProps = {
    variant: 'plain',
    size: 'sm',
    marginLeft: 2,
};
