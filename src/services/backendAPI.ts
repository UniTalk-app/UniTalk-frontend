// It should be taken from .env file in the future
const basePath = "http://localhost:8080/api/";

class BackendAPI {
    static TEST = `${basePath}test/`;
    static AUTH = `${basePath}auth/`;
    static getCategories = (groupId: number): string => `${basePath}group/${groupId}/category/all`;
    static getThreads = (groupId: number): string => `${basePath}group/${groupId}/thread/all`;
    static getMessages = (threadId: number): string => `${basePath}room/${threadId}/msg`;
    static createThread = (groupId: number): string => `${basePath}group/${groupId}/thread`;
    static deleteThread = (groupId: number, threadId: number): string => `${basePath}group/${groupId}/thread/${threadId}`;
    static createCategory = (groupId: number): string => `${basePath}group/${groupId}/category`;
    static joinGroup = (groupId: number): string => `${basePath}group/join/${groupId}`;
    static leaveGroup = (groupId: number): string => `${basePath}group/leave/${groupId}`;
    static getUsersInGroup = (groupId: number): string => `${basePath}user/${groupId}/all`;
    static userAvatar = `${basePath}avatar`;
    static deleteCategory = (groupId: number, categoryId: string): string => `${basePath}group/${groupId}/category/${categoryId}`;
    static GROUP_ALL = `${basePath}group/all`;
    static WEB_SOCKET = "http://localhost:8080/websocket";

    static MIN_USERNAME_CHARS = 1;
    static MIN_PASSWORD_CHARS = 1;
    static MIN_EMAIL_CHARS = 1;
    static MAX_USERNAME_CHARS = 32;
    static MAX_PASSWORD_CHARS = 128;
    static MAX_EMAIL_CHARS = 64;

}

export default BackendAPI;