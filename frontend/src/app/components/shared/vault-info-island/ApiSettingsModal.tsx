import { Button, ButtonProps, Separator, SeparatorProps, Stack } from '@chakra-ui/react';
import { PiFloppyDisk } from 'react-icons/pi';
import useEditApiVersion from '../../../hooks/shared/useEditApiVersion';
import {
    DialogRoot,
    DialogContent,
    DialogHeader,
    DialogCloseTrigger,
    DialogBody,
    DialogFooter,
} from '../ui-components/dialog';
import ApiVersionSection from './ApiVersionSection';
import CustomApiHeadersSection from './CustomApiHeadersSection';
import useCustomApiHeaders from '../../../hooks/shared/useCustomApiHeaders';

interface ApiSettingsModalProps {
    open: boolean;
    onClose: () => void;
}

export default function ApiSettingsModal({ open, onClose }: ApiSettingsModalProps) {
    const {
        selectedApiVersion,
        setSelectedApiVersion,
        apiVersions,
        vaultApiVersionsError,
        loadingVaultApiVersions,
        handleSaveApiVersion,
    } = useEditApiVersion();

    const { headers, addCustomApiHeader, removeCustomApiHeader, updateCustomApiHeader, handleSavingCustomApiHeaders } =
        useCustomApiHeaders();

    return (
        <DialogRoot
            open={open}
            onOpenChange={() => {
                setSelectedApiVersion(null);
                onClose();
            }}
            size='md'
        >
            <DialogContent backgroundColor='white_color_mode'>
                <DialogHeader fontSize='lg' fontWeight='bold'>
                    Vault API Settings
                </DialogHeader>
                <DialogCloseTrigger />
                <DialogBody>
                    <ApiVersionSection
                        apiVersions={apiVersions}
                        selectedApiVersion={selectedApiVersion}
                        setSelectedApiVersion={setSelectedApiVersion}
                        loadingVaultApiVersions={loadingVaultApiVersions}
                        vaultApiVersionsError={vaultApiVersionsError}
                    />
                    <Separator {...HorizontalDividerStyle} />
                    <CustomApiHeadersSection
                        headers={headers}
                        addCustomApiHeader={addCustomApiHeader}
                        removeCustomApiHeader={removeCustomApiHeader}
                        updateCustomApiHeader={updateCustomApiHeader}
                    />
                </DialogBody>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            handleSaveApiVersion();
                            handleSavingCustomApiHeaders();
                            onClose();
                        }}
                        {...SaveButtonStyle}
                    >
                        <PiFloppyDisk style={{ width: 24, height: 24, marginRight: '5px' }} />
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </DialogRoot>
    );
}

const SaveButtonStyle: ButtonProps = {
    variant: 'solid',
    size: 'sm',
    colorPalette: 'blue',
    margin: '5px',
    padding: '10px',
};

const HorizontalDividerStyle: SeparatorProps = {
    borderColor: 'veeva_light_gray.500',
    borderWidth: '1px',
    marginY: '20px',
};
