import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { MAX_FAVORITE_TOOLS, VaultToolboxSettings, defaultSettings } from '../utils/settings/VaultToolboxSettings';

// Action types
const UPDATE_PAGE_VISIBILITY = 'UPDATE_PAGE_VISIBILITY';
const UPDATE_FEATURE_FLAG = 'UPDATE_FEATURE_FLAG';
const UPDATE_FAVORITE = 'UPDATE_FAVORITE';

type Action =
    | { type: typeof UPDATE_PAGE_VISIBILITY; pageId: string; enabled: boolean }
    | { type: typeof UPDATE_FEATURE_FLAG; pageId: string; enabled: boolean; featureFlag: string }
    | { type: typeof UPDATE_FAVORITE; pageId: string; favorite: boolean };

function settingsReducer(state: VaultToolboxSettings, action: Action): VaultToolboxSettings {
    let currentFeatureSettings = state[action.pageId]?.featureSettings;
    if (!currentFeatureSettings) {
        currentFeatureSettings = defaultSettings[action.pageId].featureSettings;
    }

    switch (action.type) {
        case UPDATE_PAGE_VISIBILITY:
            return {
                ...state,
                [action.pageId]: {
                    enabled: action.enabled,
                    featureSettings: {
                        ...currentFeatureSettings,
                    },
                },
            };
        case UPDATE_FEATURE_FLAG:
            const currentPageSettings = state[action.pageId] || defaultSettings[action.pageId];
            const pageHasFeatureSpecificSettings: boolean = !!defaultSettings[action.pageId]?.featureSettings;

            if (!action?.featureFlag || !pageHasFeatureSpecificSettings) {
                return state;
            }

            return {
                ...state,
                [action.pageId]: {
                    ...currentPageSettings,
                    featureSettings: {
                        ...currentFeatureSettings,
                        [action.featureFlag]: action.enabled,
                    },
                },
            };
        case UPDATE_FAVORITE:
            const currentFavoriteCount = Object.values(state).filter((pageSettings) => pageSettings?.favorite).length;

            if (action.favorite && currentFavoriteCount >= MAX_FAVORITE_TOOLS) {
                return state;
            }

            const maxDisplayOrder = Math.max(
                0,
                ...Object.values(state).map((pageSettings) => pageSettings?.displayOrder ?? 0),
            );
            return {
                ...state,
                [action.pageId]: {
                    ...(state[action.pageId] || defaultSettings[action.pageId]),
                    favorite: action.favorite,
                    displayOrder: action.favorite ? maxDisplayOrder + 1 : undefined,
                },
            };
        default:
            return state;
    }
}

interface SettingsContextType {
    settings: VaultToolboxSettings;
    setPageVisibility: (pageId: string, enabled: boolean) => void;
    setFeatureFlag: ({
        pageId,
        enabled,
        featureFlag,
    }: {
        pageId: string;
        enabled: boolean;
        featureFlag: string;
    }) => void;
    setFavorite: (pageId: string, favorite: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

/**
 * Loads saved settings from localStorage and backfills any keys missing from
 * the current `defaultSettings` schema, so new fields reach existing users
 * without overwriting their saved choices.
 */
function hydrateSettings(): VaultToolboxSettings {
    const rawExistingSettings = localStorage.getItem('vaultToolboxSettings');
    if (!rawExistingSettings) return defaultSettings;

    const existingSettings: VaultToolboxSettings = JSON.parse(rawExistingSettings);
    const mergedSettings: VaultToolboxSettings = {};

    for (const pageId of Object.keys(defaultSettings)) {
        const defaultPage = defaultSettings[pageId];
        const savedPage = existingSettings[pageId];

        const mergedPage = { ...defaultPage, ...savedPage };
        if (defaultPage.featureSettings || savedPage?.featureSettings) {
            mergedPage.featureSettings = {
                ...defaultPage.featureSettings,
                ...savedPage?.featureSettings,
            };
        }
        mergedSettings[pageId] = mergedPage;
    }
    return mergedSettings;
}

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [settings, dispatch] = useReducer(settingsReducer, undefined, hydrateSettings);

    useEffect(() => {
        localStorage.setItem('vaultToolboxSettings', JSON.stringify(settings));
    }, [settings]);

    const setPageVisibility = (pageId: string, enabled: boolean) => {
        dispatch({ type: UPDATE_PAGE_VISIBILITY, pageId, enabled });
    };

    const setFeatureFlag = ({
        pageId,
        enabled,
        featureFlag,
    }: {
        pageId: string;
        enabled: boolean;
        featureFlag: string;
    }) => {
        dispatch({ type: UPDATE_FEATURE_FLAG, pageId, featureFlag, enabled });
    };

    const setFavorite = (pageId: string, favorite: boolean) => {
        dispatch({ type: UPDATE_FAVORITE, pageId, favorite });
    };

    return (
        <SettingsContext.Provider value={{ settings, setPageVisibility, setFeatureFlag, setFavorite }}>
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
};
