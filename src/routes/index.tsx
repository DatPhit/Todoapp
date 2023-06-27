import React from 'react';

import Home from '../pages/Home/Home';
import SignUp from '../pages/SignUp';
import SignIn from '../pages/SignIn';
import Group from '../pages/Group';
import AddTask from '../pages/AddTask';

interface RouteConfig {
    path: string;
    component: React.ComponentType;
    layout?: React.ComponentType | null;
}

// public routes
const publicRoutes: RouteConfig[] = [
    { path: '/', component: Home },
    { path: '/sign-up', component: SignUp, layout: null },
    { path: '/sign-in', component: SignIn, layout: null },
    { path: '/group', component: Group },
    { path: '/add-task', component: AddTask },
];

const privateRoutes: RouteConfig[] = [];

export { publicRoutes, privateRoutes };
