import { useState } from 'react';
import { getCustomApiHeadersFromStorage } from '../../services/SharedServices';

export interface CustomApiHeader {
    key: string;
    value: string;
}

export default function useCustomApiHeaders() {
    const [headers, setHeaders] = useState<CustomApiHeader[]>(getCustomApiHeadersFromStorage);

    /**
     * Appends a new empty header row to the list.
     */
    const addCustomApiHeader: () => void = () => {
        setHeaders((prev) => [...prev, { key: '', value: '' }]);
    };

    /**
     * Removes the header at the given row index.
     * @param headerRowIndex - Zero-based index of the row to remove.
     */
    const removeCustomApiHeader: (headerRowIndex: number) => void = (headerRowIndex) => {
        setHeaders((prev) => prev.filter((_, currentRowIndex) => currentRowIndex !== headerRowIndex));
    };

    /**
     * Updates a single field (`key` or `value`) on the header at the given row index.
     * @param headerRowIndex - Zero-based index of the row to update.
     * @param field - Which field on the header to overwrite.
     * @param val - New value for the field.
     */
    const updateCustomApiHeader: (headerRowIndex: number, field: keyof CustomApiHeader, val: string) => void = (
        headerRowIndex,
        field,
        val,
    ) => {
        setHeaders((prev) =>
            prev.map((currentHeader, currentHeaderRowIndex) =>
                currentHeaderRowIndex === headerRowIndex ? { ...currentHeader, [field]: val } : currentHeader,
            ),
        );
    };

    /**
     * Persists the current headers to session storage, dropping any rows with a blank key.
     */
    const handleSavingCustomApiHeaders: () => void = () => {
        const currentHeaders: CustomApiHeader[] = headers.filter((header) => header.key.trim() !== '');

        sessionStorage.setItem('vaultCustomApiHeaders', JSON.stringify(currentHeaders));
    };

    return {
        headers,
        addCustomApiHeader,
        removeCustomApiHeader,
        updateCustomApiHeader,
        handleSavingCustomApiHeaders,
    };
}
