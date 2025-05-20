interface IUserService {
    getStudentIdByEmail(email: string): Promise<string>;
    getTeacherIdByEmail(email: string): Promise<string>;
}

export default IUserService;
