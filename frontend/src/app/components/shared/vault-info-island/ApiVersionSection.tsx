import { Center, Spinner, Box, Heading } from '@chakra-ui/react';
import ApiErrorMessageCard from '../ApiErrorMessageCard';
import CustomSelect from '../CustomSelect';
import { ReactSelectOption } from '../../../services/SharedServices';
import { Dispatch, SetStateAction } from 'react';

interface ApiVersionSectionProps {
    vaultApiVersionsError: {
        hasError: boolean;
        errorMessage: string;
    };
    loadingVaultApiVersions: boolean;
    apiVersions: ReactSelectOption[];
    selectedApiVersion: ReactSelectOption | null;
    setSelectedApiVersion: Dispatch<SetStateAction<ReactSelectOption | null>>;
}

export default function ApiVersionSection({
    vaultApiVersionsError,
    loadingVaultApiVersions,
    apiVersions,
    selectedApiVersion,
    setSelectedApiVersion,
}: ApiVersionSectionProps) {
    return (
        <>
            {!vaultApiVersionsError.hasError ? (
                <>
                    {!loadingVaultApiVersions ? (
                        <>
                            <Heading size='md' marginBottom='10px'>
                                Vault API Version
                            </Heading>
                            <Box width='100%'>
                                <CustomSelect
                                    options={apiVersions}
                                    value={selectedApiVersion}
                                    onChange={(newValue: ReactSelectOption | null) => setSelectedApiVersion(newValue)}
                                />
                            </Box>
                        </>
                    ) : (
                        <Center>
                            <Spinner />
                        </Center>
                    )}
                </>
            ) : (
                <ApiErrorMessageCard content='Vault API Versions' errorMessage={vaultApiVersionsError.errorMessage} />
            )}
        </>
    );
}
