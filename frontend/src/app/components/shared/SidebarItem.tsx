import { Flex, Link, Icon, FlexProps, IconProps } from '@chakra-ui/react';
import { Link as RouteLink } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { Tooltip } from './ui-components/tooltip';
import { SidebarItem } from '../../utils/shared/SidebarItems';

interface SidebarItemProps {
    item: SidebarItem;
    currentRoute: string;
    onClose: () => void;
    children?: React.ReactNode;
}

export default function SidebarItem({ item, currentRoute, onClose, children }: SidebarItemProps) {
    const { settings } = useSettings();

    // Don't render if page is disabled, unless it's marked as alwaysShow (e.g. Vault Info)
    if (item.pageId && !item.alwaysShow && settings[item.pageId]?.enabled === false) {
        return null;
    }

    let thisItemsRoute = item.route;
    if (item.route !== '/') {
        thisItemsRoute = `/${item.route}`;
    }

    return (
        <Tooltip content={item.name} openDelay={0} positioning={{ placement: 'right' }}>
            <Link asChild onClick={onClose} _hover={{ textDecoration: 'none' }} focusRing='none'>
                <RouteLink to={item.route}>
                    <Flex
                        {...SidebarItemStyle}
                        borderColor={thisItemsRoute === currentRoute ? 'veeva_orange_color_mode' : 'transparent'}
                    >
                        {item.icon && <Icon {...IconStyle} as={item.icon} />}
                        {children}
                    </Flex>
                </RouteLink>
            </Link>
        </Tooltip>
    );
}

const SidebarItemStyle: FlexProps = {
    width: '100%',
    justifyContent: 'left',
    alignItems: 'center',
    padding: '5px',
    marginY: '10px',
    marginX: 0,
    borderWidth: '3px',
    borderRadius: '10px',
    role: 'group',
    cursor: 'pointer',
    _hover: {
        bg: 'veeva_orange_color_mode',
        color: 'white',
    },
    borderColor: 'veeva_orange_color_mode',
    fontSize: 'md',
};

const IconStyle: IconProps = {
    boxSize: 8,
    _hover: { color: 'white' },
};
