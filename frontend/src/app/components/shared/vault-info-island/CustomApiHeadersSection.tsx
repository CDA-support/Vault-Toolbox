import { Button, Flex, Heading, IconButton, Input, Stack } from '@chakra-ui/react';
import { PiPlus, PiTrash } from 'react-icons/pi';
import { CustomApiHeader } from '../../../hooks/shared/useCustomApiHeaders';

interface CustomApiHeadersSectionProps {
    headers: CustomApiHeader[];
    addCustomApiHeader: () => void;
    removeCustomApiHeader: (headerRowIndex: number) => void;
    updateCustomApiHeader: (headerRowIndex: number, field: keyof CustomApiHeader, val: string) => void;
}

export default function CustomApiHeadersSection({
    headers,
    addCustomApiHeader,
    removeCustomApiHeader,
    updateCustomApiHeader,
}: CustomApiHeadersSectionProps) {
    return (
        <>
            <Heading size='md' marginBottom='8px'>
                Custom Headers
            </Heading>
            <Stack gap='8px'>
                {headers.map((header, headerRow: number) => (
                    <Flex key={headerRow} gap='8px' align='center'>
                        <Input
                            size='sm'
                            placeholder='Name'
                            borderColor='light_gray_color_mode'
                            value={header.key}
                            onChange={(e) => updateCustomApiHeader(headerRow, 'key', e.target.value)}
                        />
                        <Input
                            size='sm'
                            placeholder='Value'
                            borderColor='light_gray_color_mode'
                            value={header.value}
                            onChange={(e) => updateCustomApiHeader(headerRow, 'value', e.target.value)}
                        />
                        <IconButton
                            aria-label='Remove header'
                            size='sm'
                            variant='ghost'
                            colorPalette='red'
                            onClick={() => removeCustomApiHeader(headerRow)}
                        >
                            <PiTrash />
                        </IconButton>
                    </Flex>
                ))}
            </Stack>
            <Button
                size='sm'
                variant='outline'
                marginTop='8px'
                onClick={addCustomApiHeader}
                borderColor='light_gray_color_mode'
            >
                <PiPlus style={{ marginRight: '4px' }} />
                Add Header
            </Button>
        </>
    );
}
