import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCn83CyI5zxFa3lIP_SkOp1zRpfp3keHS4",
	authDomain: "lama-a5b0b.firebaseapp.com",
	projectId: "lama-a5b0b",
	storageBucket: "lama-a5b0b.appspot.com",
	messagingSenderId: "1051282458177",
	appId: "1:1051282458177:web:d6888e090a6929f46628c0",
	measurementId: "G-RTKQZE0QHK",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
