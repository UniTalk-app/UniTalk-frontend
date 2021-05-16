// It should be taken from .env file in the future
const basePath = "http://localhost:8080/api/";

class BackendAPI {
    static TEST = `${basePath}test/`;
    static AUTH = `${basePath}auth/`;
    static getCategories = (groupId: number): string => `${basePath}group/${groupId}/category/all`;
    static getThreads = (groupId: number): string => `${basePath}group/${groupId}/thread/all`;
    static createThread = (groupId: number): string => `${basePath}group/${groupId}/thread`;
    static GROUP_ALL = `${basePath}group/all`;

    static MIN_USERNAME_CHARS = 1;
    static MIN_PASSWORD_CHARS = 1;
    static MIN_EMAIL_CHARS = 1;
    static MAX_USERNAME_CHARS = 32;
    static MAX_PASSWORD_CHARS = 128;
    static MAX_EMAIL_CHARS = 64;

}

export default BackendAPI;