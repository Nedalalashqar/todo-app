import React from 'react';
export const SettingsContext = React.createContext();

export default function Settings(props) {
    const state = {
        itemsPerPage: 2,
        sortCat: 'hardest',
        showCompleted: true,
    }
   return (
        <SettingsContext.Provider value={state}>
            {props.children}
        </SettingsContext.Provider>
    )
}