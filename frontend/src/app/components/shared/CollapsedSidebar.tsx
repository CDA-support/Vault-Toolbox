import { Separator, Flex, IconButton, Spacer, Link, IconButtonProps, FlexProps } from '@chakra-ui/react';
import { PiListBold, PiSignOut, PiGear, PiDotsThreeOutlineFill } from 'react-icons/pi';
import { Link as RouteLink } from 'react-router-dom';
import useFavoriteTools from '../../hooks/shared/useFavoriteTools';
import SidebarItem from './SidebarItem';
import { Tooltip } from './ui-components/tooltip';

interface CollapsedSidebarProps {
    onOpen: () => void;
    onClose: () => void;
    currentRoute: string;
    logout: () => void;
}

export default function CollapsedSidebar({ onOpen, onClose, currentRoute, logout }: CollapsedSidebarProps) {
    const { collapsedSidebarItems, hasMoreTools } = useFavoriteTools();

    return (
        <Flex {...CollapsedSidebarFlexStyle}>
            <IconButton onClick={onOpen} {...ExpandSidebarButtonStyle}>
                <PiListBold style={{ width: 38, height: 38, margin: '10px' }} />
            </IconButton>
            {collapsedSidebarItems.map((tool) => (
                <SidebarItem key={tool.name} item={tool} currentRoute={currentRoute} onClose={onClose} />
            ))}
            {hasMoreTools && (
                <Tooltip content='More tools' openDelay={0} positioning={{ placement: 'right' }}>
                    <Flex onClick={onOpen} {...MoreToolsIconStyle}>
                        <PiDotsThreeOutlineFill style={{ width: 24, height: 24 }} />
                    </Flex>
                </Tooltip>
            )}
            <Spacer />
            <Link asChild onClick={onClose} _hover={{ textDecoration: 'none' }} focusRing='none'>
                <RouteLink to='/settings'>
                    <Tooltip content='Settings' openDelay={0} positioning={{ placement: 'right' }}>
                        <Flex
                            {...SettingsIconButtonStyle}
                            borderColor={currentRoute === '/settings' ? 'veeva_orange_color_mode' : 'transparent'}
                        >
                            <PiGear style={{ width: 24, height: 24, transform: 'rotate(20deg)' }} />
                        </Flex>
                    </Tooltip>
                </RouteLink>
            </Link>
            <Flex width='100%' paddingX='10px'>
                <Separator
                    css={{ width: '100%', borderColor: 'gray_background_color_mode', borderWidth: '0 0 1px 0' }}
                />
            </Flex>
            <Tooltip content='Logout' positioning={{ placement: 'right' }} openDelay={0}>
                <IconButton onClick={logout} {...LogoutIconButtonStyle}>
                    <PiSignOut style={{ width: 24, height: 24 }} />
                </IconButton>
            </Tooltip>
        </Flex>
    );
}

const CollapsedSidebarFlexStyle: FlexProps = {
    flexDirection: 'column',
    height: '100%',
    width: 'auto',
    overflowY: 'auto',
    alignItems: 'center',
};

const ExpandSidebarButtonStyle: IconButtonProps = {
    width: '100%',
    height: '58px',
    variant: 'ghost',
    borderRadius: 0,
};

const LogoutIconButtonStyle: IconButtonProps = {
    variant: 'ghost',
    backgroundColor: 'white_color_mode',
    _hover: {
        backgroundColor: 'blue.400',
        color: 'white',
    },
    height: '42px',
    width: '42px',
    padding: '5px',
    margin: '10px',
    borderRadius: '10px',
};

const MoreToolsIconStyle: FlexProps = {
    justifyContent: 'center',
    alignItems: 'center',
    height: '42px',
    width: '42px',
    margin: '10px',
    padding: '5px',
    borderRadius: '10px',
    cursor: 'pointer',
    _hover: {
        bg: 'veeva_orange_color_mode',
        color: 'white',
    },
};

const SettingsIconButtonStyle: FlexProps = {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white_color_mode',
    _hover: {
        bg: 'veeva_orange_color_mode',
        color: 'white',
    },
    height: '42px',
    width: '42px',
    padding: '5px',
    margin: '10px',
    borderRadius: '10px',
    borderWidth: '3px',
};
