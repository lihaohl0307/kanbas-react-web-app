import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const axiosWithCredentials = axios.create({withCredentials: true});

const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const getAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/all`);
  return data;
};

// export const enrollInCourse = async (userId: any, courseId: any) => {
//   await axios.post(`/api/enrollments`, { userId, courseId });
// };

export const enrollInCourse = async (courseId: any) => {
  const { data } = await axiosWithCredentials.post(`${COURSES_API}/enroll`, { courseId });
  return data;
};
