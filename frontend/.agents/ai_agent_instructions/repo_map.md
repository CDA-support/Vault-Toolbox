# 🗺️ Vault Toolbox Repo Map (PageRank Sorted)

*Generated at: 5/13/2026, 12:04:37 PM*
*Total Files: 199*

## 🏗️ Architectural Backbone (Top 20%)
### 📄 src/app/services/ApiService.js (Score: 0.1719)
  - **Exports:** `VAULT_CLIENT_ID`, `invokeAwsLambdaFunction`, `retrieveAllDocumentTypes`, `retrieveAllDocumentFields`, `retrieveDocumentSignatureMetadata`, `retrieveDomainInformation`, `query`, `queryByPage`, `listItemsAtAPath`, `listItemsAtAPathByPage`, `downloadItemContent`, `createFolderOrFile`, `handleDeleteFileStagingItem`, `retrieveAvailableDirectDataFiles`, `downloadDirectDataFile`, `retrieveComponentRecordMdl`, `retrieveComponentRecordXmlJson`, `executeMdlScript`, `executeMdlScriptAsync`, `retrieveAsyncMdlScriptResults`, `retrieveObjectCollection`, `retrieveAllComponentMetadata`, `retrieveObjectMetadata`, `retrieveUserMetadata`, `retrievePicklistValues`, `retrieveJobStatus`, `sessionKeepAlive`, `login`, `getAuthorizationHeader`, `getVaultDNS`, `handleErrors`

### 📄 src/app/services/vapil/VaultRequest.js (Score: 0.1086)
  - **Exports:** `VAULT_API_VERSION`, `VAULT_DEVELOPER_TOOLBOX_VERSION`, `HTTP_HEADER_CONTENT_TYPE`, `HTTP_HEADER_ACCEPT`, `HTTP_HEADER_VAULT_CLIENT_ID`, `HTTP_HEADER_REFERENCE_ID`, `HTTP_HEADER_AUTHORIZATION`, `HTTP_HEADER_CONTENT_LENGTH`, `HTTP_HEADER_CONTENT_MD5`, `HTTP_HEADER_FILEPART_NUMBER`, `HTTP_CONTENT_TYPE_JSON`, `HTTP_CONTENT_TYPE_XFORM`, `HTTP_CONTENT_TYPE_PLAINTEXT`, `HTTP_CONTENT_TYPE_OCTET_STREAM`, `request`, `getAPIEndpoint`, `getPaginationEndpoint`, `RequestMethod`

### 📄 src/app/services/SharedServices.ts (Score: 0.0922)
  - **Exports:** `VAULT_SUBDOMAINS`, `isProductionVault`, `isSandboxVault`, `getVaultDns`, `getVaultId`, `getVaultName`, `getVaultDomainType`, `getVaultUsername`, `getVaultApiVersion`, `formatDateTime`, `formatBytesToUserFriendlyFormat`, `convertArrayToSelectOptions`, `pollJobStatus`, `chunkFile`

### 📄 src/app/components/shared/ui-components/close-button.tsx (Score: 0.0216)
  - **Exports:** `CloseButton`

### 📄 src/app/components/shared/ui-components/tooltip.tsx (Score: 0.0137)
  - **Exports:** `Tooltip`

### 📄 src/app/services/vapil/AuthenticationRequest.js (Score: 0.0134)
  - **Exports:** `retrieveApiVersions`, `login`, `sessionKeepAlive`

### 📄 src/app/components/shared/ui-components/dialog.tsx (Score: 0.0133)
  - **Exports:** `DialogContent`, `DialogCloseTrigger`, `DialogRoot`, `DialogFooter`, `DialogHeader`, `DialogBody`, `DialogBackdrop`, `DialogTitle`, `DialogDescription`, `DialogTrigger`, `DialogActionTrigger`

### 📄 src/app/services/vapil/FileStagingRequest.js (Score: 0.0132)
  - **Exports:** `listItemsAtAPath`, `listItemsAtAPathByPage`, `downloadItemContent`, `createFolderOrFile`, `deleteFolderOrFile`, `createResumableUploadSession`, `uploadToASession`, `commitUploadSession`, `abortUploadSession`

### 📄 src/app/services/vapil/UserRequest.js (Score: 0.0128)
  - **Exports:** `retrieveUserMetadata`

### 📄 src/app/services/vapil/QueryRequest.js (Score: 0.0128)
  - **Exports:** `query`, `queryByPage`

### 📄 src/app/services/vapil/PicklistRequest.js (Score: 0.0128)
  - **Exports:** `retrievePicklistValues`

### 📄 src/app/services/vapil/MetaDataRequest.js (Score: 0.0128)
  - **Exports:** `retrieveComponentRecordMdl`, `retrieveComponentRecordXmlJson`, `executeMdlScript`, `executeMdlScriptAsync`, `retrieveAsyncMdlScriptResults`, `retrieveObjectCollection`, `retrieveAllComponentMetadata`, `retrieveObjectMetadata`

### 📄 src/app/services/vapil/JobsRequest.js (Score: 0.0128)
  - **Exports:** `retrieveJobStatus`

### 📄 src/app/services/vapil/DomainRequest.js (Score: 0.0128)
  - **Exports:** `retrieveDomainInformation`

### 📄 src/app/services/vapil/DocumentSignatureRequest.js (Score: 0.0128)
  - **Exports:** `retrieveDocumentSignatureMetadata`

### 📄 src/app/services/vapil/DocumentRequest.js (Score: 0.0128)
  - **Exports:** `retrieveAllDocumentTypes`, `retrieveAllDocumentFields`

### 📄 src/app/services/vapil/DirectDataRequest.js (Score: 0.0128)
  - **Exports:** `retrieveAvailableDirectDataFiles`, `downloadDirectDataFile`

### 📄 src/app/utils/settings/VaultToolboxSettings.ts (Score: 0.0125)
  - **Exports:** `defaultSettings`, `PageSettingsMetadata`, `FeatureSettingsMetadata`

### 📄 src/app/hooks/data-navigator/useDataReducer.ts (Score: 0.0111)
  - **Exports:** `useDataReducer`

### 📄 src/app/components/shared/ui-components/color-mode.tsx (Score: 0.0092)
  - **Exports:** `ColorModeProvider`, `useColorMode`, `useColorModeValue`, `ColorModeIcon`, `ColorModeButton`, `LightMode`, `DarkMode`

### 📄 src/app/components/shared/CustomSelect.jsx (Score: 0.0082)
  - **Exports:** `CustomSelect`

### 📄 src/app/hooks/login/useSavedVaultData.ts (Score: 0.0071)
  - **Exports:** `useSavedVaultData`

### 📄 src/app/components/shared/ui-components/toaster.tsx (Score: 0.0067)
  - **Exports:** `toaster`, `Toaster`

### 📄 src/app/components/shared/ApiErrorMessageCard.tsx (Score: 0.0065)
  - **Exports:** `ApiErrorMessageCard`

### 📄 src/app/context/AuthContext.tsx (Score: 0.0059)
  - **Exports:** `useAuth`, `AuthProvider`

### 📄 src/app/context/SettingsContext.tsx (Score: 0.0053)
  - **Exports:** `SettingsProvider`, `useSettings`

### 📄 src/app/components/shared/ui-components/checkbox.tsx (Score: 0.0052)
  - **Exports:** `Checkbox`

### 📄 src/app/components/shared/ui-components/input-group.tsx (Score: 0.0051)
  - **Exports:** `InputGroup`

### 📄 src/app/components/shared/ui-components/popover.tsx (Score: 0.0038)
  - **Exports:** `PopoverContent`, `PopoverArrow`, `PopoverCloseTrigger`, `PopoverTitle`, `PopoverDescription`, `PopoverFooter`, `PopoverHeader`, `PopoverRoot`, `PopoverBody`, `PopoverTrigger`

### 📄 src/app/components/shared/JsonSyntaxHighlighter.jsx (Score: 0.0037)
  - **Exports:** `default`

### 📄 src/app/hooks/file-browser/useFileDownloadModal.js (Score: 0.0036)
  - **Exports:** `SUCCESS`, `FAILURE`, `IN_PROGRESS`, `CANCELLED`, `useFileDownloadModal`

### 📄 src/app/components/shared/ui-components/breadcrumb.tsx (Score: 0.0034)
  - **Exports:** `BreadcrumbRoot`, `BreadcrumbLink`, `BreadcrumbCurrentLink`, `BreadcrumbEllipsis`

### 📄 src/app/hooks/file-browser/useFileBrowserSearch.js (Score: 0.0034)
  - **Exports:** `useFileBrowserSearch`

### 📄 src/app/App.jsx (Score: 0.0033)
  - **Exports:** `App`

### 📄 src/app/components/shared/ErrorBoundaryCard.tsx (Score: 0.0032)
  - **Exports:** `ErrorBoundaryCard`

### 📄 src/app/components/data-navigator/DataTabs.tsx (Score: 0.0032)
  - **Exports:** `DataTabs`

### 📄 src/app/components/login/LoginCard.tsx (Score: 0.0032)
  - **Exports:** `LoginCard`

### 📄 src/app/components/vql-editor/query-history/QueryHistoryRow.jsx (Score: 0.0030)
  - **Exports:** `QueryHistoryRow`

### 📄 src/app/components/shared/VaultInfoIsland.tsx (Score: 0.0030)
  - **Exports:** `VaultInfoIsland`

### 📄 src/app/components/shared/ContextualHelpButton.jsx (Score: 0.0030)
  - **Exports:** `ContextualHelpButton`

## 📂 Project Structure (Remainder)
- **src/**
  - **app/**
    - App.test.jsx
    - **components/**
      - **api-history/**
        - ApiHistory.jsx
      - **component-editor/**
        - ComponentConsole.jsx
        - ComponentDirectoryPanel.jsx
        - ComponentEditorHeaderRow.jsx
        - ComponentEditorIsland.jsx
        - ComponentTree.jsx
        - OutstandingAsyncJobWarning.jsx
      - **data-navigator/**
        - DataLookupInfoPopover.tsx
        - DataNavigatorHeaderRow.tsx
        - DataNavigatorIsland.tsx
        - DataTabTooltip.tsx
        - DataTable.tsx
        - FieldLabelCell.tsx
        - FieldNameCell.tsx
        - FieldTypeCell.tsx
        - FieldValueActionMenu.tsx
        - FieldValueCell.tsx
        - FullTextDisplayDialog.tsx
        - MultiSelectColumnFilter.tsx
        - OpenComponentEditorConfirmationDialog.tsx
        - ReadOnlyComponentEditorDialog.tsx
        - SearchableColumnFilter.tsx
      - **data-tools/**
        - ConfirmDataDeletion.jsx
        - DataFilesPanel.jsx
        - DataFilesTableBody.jsx
        - DataFilesTableHeader.jsx
        - DataSelectionCheckboxGroup.jsx
        - DataSelectionPanel.jsx
        - DataToolsHeaderRow.jsx
        - DataToolsIand.jsx
        - FileContentsModal.jsx
      - **file-browser/**
        - DownloadProgressModal.jsx
        - FileBrowserDirectoryPanel.jsx
        - FileBrowserHeaderRow.jsx
        - FileBrowserIsland.jsx
        - **direct-data/**
          - DirectDataBrowserBreadcrumb.jsx
          - DirectDataBrowserSearchBar.jsx
          - DirectDataBrowserTable.jsx
          - DirectDataTree.jsx
          - DirectDataVirtualizedTable.jsx
        - **file-staging/**
          - ConfirmFileOrFolderDeletion.jsx
          - FileStagingBrowserBreadcrumb.jsx
          - FileStagingBrowserSearchBar.jsx
          - FileStagingBrowserTable.jsx
          - FileStagingTree.jsx
          - FileStagingVirtualizedTable.jsx
      - **login/**
        - IntegratedLoginAlert.tsx
        - SavedVaultsPopover.tsx
        - SavedVaultsTable.tsx
        - SavedVaultsTableRow.tsx
      - **settings/**
        - FeatureSettingsTableRow.tsx
        - GeneralSettingsTab.tsx
        - PageSettingsTab.tsx
        - PageSettingsTableRow.tsx
        - SettingsIsland.tsx
      - **shared/**
        - CodeEditor.jsx
        - CollapsedSidebar.jsx
        - DrawerSidebar.jsx
        - EditApiVersionModal.jsx
        - HorizontalResizeHandle.jsx
        - IdleWarningDialog.jsx
        - Layout.jsx
        - NotOfficialVeevaProductAlert.tsx
        - ProtectedRoute.jsx
        - Sidebar.jsx
        - SidebarItem.jsx
        - TelemetryData.jsx
        - VerticalResizeHandle.jsx
        - VirtualizedTable.jsx
        - **ui-components/**
          - drawer.tsx
          - field.tsx
          - file-upload.tsx
          - menu.tsx
          - provider.tsx
          - radio.tsx
          - select.tsx
          - skeleton.tsx
          - switch.tsx
      - **vault-info/**
        - VaultInfoHeader.tsx
        - VaultInfoTable.tsx
      - **vql-editor/**
        - VqlActionsMenu.jsx
        - VqlConfirmQueryDeletionModal.jsx
        - VqlConsole.jsx
        - VqlEditorIsland.jsx
        - VqlHeaderRow.jsx
        - VqlProdVaultWarningModal.jsx
        - VqlSaveQueryModal.jsx
        - VqlSavedQueriesContainer.jsx
        - VqlTableBody.jsx
        - VqlTableHeader.jsx
        - **query-builder/**
          - QueryBuilderContainer.jsx
          - QueryCategorySelector.jsx
          - QueryFieldsSelector.jsx
          - QueryFilterRow.jsx
          - QueryObjectSelector.jsx
          - QueryTargetSelector.jsx
          - VqlQueryMetadata.js
          - WhereClauseBuilder.jsx
        - **query-history/**
          - QueryHistoryContainer.jsx
    - **hooks/**
      - **component-editor/**
        - useComponentEditor.js
        - useComponentTree.js
      - **data-navigator/**
        - useDataNavigator.ts
        - useDataNavigatorInput.ts
        - useDataTable.ts
        - useMultiSelectColumnFilter.ts
        - useOverflowResizer.ts
      - **data-tools/**
        - useConfirmDataDeletion.js
        - useDataFileModal.js
        - useDataFiles.js
        - useDataTools.js
        - useFileContents.js
        - useVaultData.js
        - useVaultDataSelection.js
      - **file-browser/**
        - **direct-data/**
          - useDirectDataBrowser.js
          - useDirectDataTree.js
        - **file-staging/**
          - useConfirmFileStagingItemDeletion.js
          - useFileStagingBrowser.js
          - useFileStagingTree.js
          - useFileStagingUpload.js
        - useFileBrowserTabs.js
        - useFolderContents.js
      - **login/**
        - useIntegratedLogin.ts
        - useSavedVaultsPopover.ts
        - useSavedVaultsTable.ts
        - useVaultLoginForm.ts
      - **settings/**
        - useFeatureSpecificSettings.ts
        - usePageSettings.ts
      - **shared/**
        - useEditApiVersion.ts
        - useElementHeight.ts
        - useIdleTimer.ts
        - useLogout.ts
        - useRemainingHeight.ts
        - useVaultSession.ts
        - useVaultSessionKeepAlive.ts
      - **vault-info/**
        - useVaultInfo.ts
      - **vql-editor/**
        - useQueryBuilder.js
        - useQueryHistory.js
        - useQuerySidePanel.js
        - useSavedQueries.js
        - useVqlQuery.js
    - index.jsx
    - **pages/**
      - ComponentEditorPage.jsx
      - DataNavigatorPage.tsx
      - DataToolsPage.jsx
      - ErrorPage.tsx
      - FileBrowserPage.jsx
      - LoginPage.tsx
      - SettingsPage.tsx
      - VaultInfoPage.tsx
      - VqlEditorPage.jsx
    - **utils/**
      - **component-editor/**
        - MdlLanguageDefinition.ts
      - **data-navigator/**
        - DataNavigatorHelper.ts
      - **shared/**
        - SidebarItems.ts
        - VeevaTheme.ts
      - **vql-editor/**
        - VqlLanguageDefinition.ts
        - VqlQueryMetadata.js
  - **background/**
    - background.js
  - setupTests.js
