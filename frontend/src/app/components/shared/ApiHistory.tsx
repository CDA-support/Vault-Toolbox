import {
    Badge,
    Box,
    DialogBodyProps,
    DialogContentProps,
    IconButton,
    IconButtonProps,
    Table,
    TableCellProps,
    TableColumnHeaderProps,
    TableRootProps,
    TableRowProps,
    Text,
    TextProps,
} from '@chakra-ui/react';
import { CSSProperties, Fragment } from 'react';
import { PiCaretDown, PiCaretRight, PiListBulletsFill } from 'react-icons/pi';
import useApiHistory from '../../hooks/shared/useApiHistory';
import ApiHistoryExpandedRow from './ApiHistoryExpandedRow';
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogRoot } from './ui-components/dialog';
import { Tooltip } from './ui-components/tooltip';

const TABLE_COLUMN_COUNT = 7;

export default function ApiHistory() {
    const { displayedHistoryRows, expandedEntryDetails, isModalOpen, openModal, closeModal } = useApiHistory();

    return (
        <>
            <Tooltip content='API History' openDelay={0} positioning={{ placement: 'left' }}>
                <IconButton onClick={openModal} {...TriggerButtonStyle}>
                    <PiListBulletsFill style={ListIconStyle} />
                </IconButton>
            </Tooltip>
            <DialogRoot
                open={isModalOpen}
                onOpenChange={({ open }) => {
                    if (!open) closeModal();
                }}
                size='cover'
            >
                <DialogContent {...DialogContentStyle}>
                    <DialogHeader>
                        <Text fontSize='lg' fontWeight='bold'>
                            API History
                        </Text>
                    </DialogHeader>
                    <DialogCloseTrigger />
                    <DialogBody {...DialogBodyStyle}>
                        {displayedHistoryRows.length === 0 ? (
                            <Text {...EmptyStateTextStyle}>No API calls have been logged in this session yet.</Text>
                        ) : (
                            <Table.Root {...TableRootStyle}>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.ColumnHeader {...ColumnHeaderStyle} width='1%' />
                                        <Table.ColumnHeader {...ColumnHeaderStyle} width='1%'>
                                            Time
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader {...ColumnHeaderStyle} width='1%'>
                                            Duration
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader {...ColumnHeaderStyle} width='1%'>
                                            Method
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader {...ColumnHeaderStyle}>Endpoint</Table.ColumnHeader>
                                        <Table.ColumnHeader {...ColumnHeaderStyle} width='1%'>
                                            Response Headers
                                        </Table.ColumnHeader>
                                        <Table.ColumnHeader {...ColumnHeaderStyle} width='1%'>
                                            Status
                                        </Table.ColumnHeader>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {displayedHistoryRows.map((historyRow) => (
                                        <Fragment key={historyRow.id}>
                                            <Table.Row
                                                {...BodyRowStyle}
                                                onClick={historyRow.onToggle}
                                                aria-expanded={historyRow.isExpanded}
                                            >
                                                <Table.Cell {...BodyCellStyle} width='1%'>
                                                    {historyRow.isExpanded ? (
                                                        <PiCaretDown style={CaretIconStyle} />
                                                    ) : (
                                                        <PiCaretRight style={CaretIconStyle} />
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell {...BodyCellStyle} fontFamily='mono'>
                                                    {historyRow.formattedTime}
                                                </Table.Cell>
                                                <Table.Cell {...BodyCellStyle}>
                                                    {historyRow.formattedDuration}
                                                </Table.Cell>
                                                <Table.Cell {...BodyCellStyle}>
                                                    <Badge colorPalette={historyRow.methodColorPalette}>
                                                        {historyRow.method}
                                                    </Badge>
                                                </Table.Cell>
                                                <Table.Cell {...EndpointCellStyle}>
                                                    {historyRow.endpointPath}
                                                </Table.Cell>
                                                <Table.Cell {...BodyCellStyle} fontFamily='mono' lineHeight='1.4'>
                                                    {historyRow.displayedResponseHeaders.map((displayedHeader) => (
                                                        <Box key={displayedHeader.label}>
                                                            <Text as='strong' fontWeight='bold'>
                                                                {displayedHeader.label}:
                                                            </Text>{' '}
                                                            {displayedHeader.value}
                                                        </Box>
                                                    ))}
                                                </Table.Cell>
                                                <Table.Cell {...BodyCellStyle}>
                                                    <Badge colorPalette={historyRow.statusColorPalette}>
                                                        {historyRow.displayedStatus}
                                                    </Badge>
                                                </Table.Cell>
                                            </Table.Row>
                                            {historyRow.isExpanded && expandedEntryDetails && (
                                                <Table.Row {...ExpandedRowStyle}>
                                                    <Table.Cell {...ExpandedCellStyle} colSpan={TABLE_COLUMN_COUNT}>
                                                        <ApiHistoryExpandedRow details={expandedEntryDetails} />
                                                    </Table.Cell>
                                                </Table.Row>
                                            )}
                                        </Fragment>
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        )}
                    </DialogBody>
                </DialogContent>
            </DialogRoot>
        </>
    );
}

const TriggerButtonStyle: IconButtonProps = {
    borderRadius: 'full',
    variant: 'ghost',
    marginBottom: '5px',
    'aria-label': 'API History',
};

const DialogContentStyle: DialogContentProps = {
    backgroundColor: 'white_color_mode',
    maxW: '90vw',
    width: '90vw',
    maxH: '85vh',
    height: '85vh',
};

const DialogBodyStyle: DialogBodyProps = {
    overflow: 'auto',
    paddingX: 0,
    paddingTop: 0,
};

const EmptyStateTextStyle: TextProps = {
    padding: '20px',
    textAlign: 'center',
    color: 'veeva_dark_gray_text_color_mode',
};

const TableRootStyle: TableRootProps = {
    variant: 'line',
    size: 'sm',
    stickyHeader: true,
    width: '100%',
};

const ColumnHeaderStyle: TableColumnHeaderProps = {
    backgroundColor: 'beige_color_mode',
    fontWeight: 'bold',
    top: 0,
    zIndex: 1,
};

const BodyRowStyle: TableRowProps = {
    backgroundColor: 'veeva_sunset_yellow.five_percent_opacity',
    cursor: 'pointer',
    _hover: {
        backgroundColor: 'beige_color_mode',
    },
};

const BodyCellStyle: TableCellProps = {
    borderBottom: 'solid thin',
    borderColor: 'gray.300',
    verticalAlign: 'center',
    fontSize: '12px',
    whiteSpace: 'nowrap',
    textAlign: 'left',
};

const EndpointCellStyle: TableCellProps = {
    ...BodyCellStyle,
    fontFamily: 'mono',
    whiteSpace: 'normal',
    wordBreak: 'break-all',
};

const ExpandedRowStyle: TableRowProps = {
    backgroundColor: 'veeva_light_gray_color_mode',
};

const ExpandedCellStyle: TableCellProps = {
    padding: '14px 16px',
    borderBottom: 'solid thin',
    borderColor: 'gray.300',
};

const CaretIconStyle: CSSProperties = {
    width: 14,
    height: 14,
};

const ListIconStyle: CSSProperties = {
    width: 24,
    height: 24,
};
