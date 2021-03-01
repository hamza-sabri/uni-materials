import {createContext} from 'react';

export const DynamicContentStateContext = createContext<React.Dispatch<React.SetStateAction<JSX.Element>> | undefined>(undefined);
