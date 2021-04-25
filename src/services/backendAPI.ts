// It should be taken from .env file in the future
const basePath = "http://localhost:8080/api/";

class BackendAPI {
    static TEST = `${basePath}test/`;
    static AUTH = `${basePath}auth/`;
    static getCategories = (groupId: number): string => `${basePath}group/${groupId}/category/all`;
    static getThreads = (groupId: number): string => `${basePath}group/${groupId}/thread/all`;
    static GROUP_ALL = `${basePath}group/all`;
}

export default BackendAPI;
