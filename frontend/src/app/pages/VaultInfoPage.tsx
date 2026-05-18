import { Flex, Center, Spinner, Box, FlexProps, StackProps, VStack, Spacer } from '@chakra-ui/react';
import ApiErrorMessageCard from '../components/shared/ApiErrorMessageCard';
import ApiHistory from '../components/shared/ApiHistory';
import NotOfficialVeevaProductAlert from '../components/shared/NotOfficialVeevaProductAlert';
import VaultInfoHeader from '../components/vault-info/VaultInfoHeader';
import VaultInfoTable from '../components/vault-info/VaultInfoTable';
import useVaultInfo from '../hooks/vault-info/useVaultInfo';
import ContextualHelpButton from '../components/shared/ContextualHelpButton';
import VaultInfoIsland from '../components/shared/vault-info-island/VaultInfoIsland';

export default function VaultInfoPage() {
    const { loadingVaultInfo, vaultInfoError } = useVaultInfo();

    return (
        <Flex justify='flex-start' height='100vh'>
            <VStack {...PageStackStyle}>
                <Flex {...ParentFlexStyle}>
                    <VaultInfoHeader />
                    {loadingVaultInfo ? (
                        <Center>
                            <Spinner />
                        </Center>
                    ) : (
                        <Box>
                            {vaultInfoError.hasError ? (
                                <ApiErrorMessageCard
                                    content='Vault Information'
                                    errorMessage={vaultInfoError.errorMessage}
                                />
                            ) : (
                                <VaultInfoTable />
                            )}
                        </Box>
                    )}
                    <NotOfficialVeevaProductAlert />
                </Flex>
                <Box flexShrink={0} width='100%' display='flex' justifyContent='center'>
                    <VaultInfoIsland />
                </Box>
            </VStack>

            <Box height='100vh' flex='0 0 auto'>
                <Flex flexDirection='column' height='100%'>
                    <Spacer />
                    <ApiHistory />
                    <ContextualHelpButton
                        tooltip='Vault Toolbox'
                        url='https://general.veevavault.dev/vault-toolbox/browser-extension/overview'
                    />
                </Flex>
            </Box>
        </Flex>
    );
}

const PageStackStyle: StackProps = {
    height: '100%',
    backgroundColor: 'veeva_light_gray_color_mode',
    flex: 1,
    gap: 8,
    overflow: 'hidden',
    boxShadow: 'inset -5px 0 8px -8px rgba(0,0,0,0.3), inset 5px 0 8px -8px rgba(0,0,0,0.3)',
};

const ParentFlexStyle: FlexProps = {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    overflowY: 'auto',
    width: 'calc(100% - 20px)',
    margin: '0px 0px 5px 0px',
    paddingTop: '20px',
    gap: 8,
};
