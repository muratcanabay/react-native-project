import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AuthStack from './AuthStack';

const Routes = () => {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
};

export default Routes;