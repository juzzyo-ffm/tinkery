const usersReducer = (users, action) => {
    switch (action.type) {
    case 'POPULATE_USERS':
        return action.users;
    case 'ADD_USER':
        return users = [
            ...users,
            action.user
        ];
    case 'REMOVE_USER':
        return users.filter((user) => user.username !== action.username);
    default:
        return users;
    }
};

export {usersReducer as default};