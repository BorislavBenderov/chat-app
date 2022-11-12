import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { database, storage, auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export const LoginRegister = () => {
    const navigate = useNavigate();

    const onRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userName = formData.get('txt');
        const email = formData.get('email');
        const password = formData.get('pswd');
        const imageUrl = formData.get('imageUrl');

        if (userName === '' || email === '' || password === "" || imageUrl === '') {
            alert('Please fill all the fields');
            return;
        }

        setPersistence(auth, browserSessionPersistence)
            .then(async () => {
               const res = await createUserWithEmailAndPassword(auth, email, password);
               const storageRef = ref(storage, userName);
               const uploadTask = uploadBytesResumable(storageRef, imageUrl);
               uploadTask.on(
                (err) => {
                    alert(err.message);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadUrl) => {
                            await updateProfile(res.user, {
                            displayName: userName,
                            photoURL: downloadUrl
                           });
                            await setDoc(doc(database, 'users', res.user.uid), {
                            displayName : userName,
                            imageUrl: downloadUrl,
                            uid: res.user.uid
                        })
                    })
                })              
               })
            .catch((err) => {
                alert(err.message);
            });
        navigate('/chat');
    }

    const onLogin = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('pswd');

        if (email === '' || password === '') {
            alert('Please fill all the fields');
            return;
        }

        setPersistence(auth, browserSessionPersistence)
            .then(() => {
                signInWithEmailAndPassword(auth, email, password);
            })
            .catch((err) => {
                alert(err.message);
            });
        navigate('/chat');
    }

    return (
        <div className="main">
            <input type="checkbox" id="chk" aria-hidden="true" />
            <div className="signup">
                <form onSubmit={onRegister}>
                    <label htmlFor="chk" aria-hidden="true">
                        Register
                    </label>
                    <input type="text" name="txt" placeholder="User name" required="" />
                    <input type="email" name="email" placeholder="Email" required="" />
                    <input type="password" name="pswd" placeholder="Password" required="" />
                    <input type="file" name="imageUrl"/>
                    <button>Sign up</button>
                </form>
            </div>
            <div className="login">
                <form onSubmit={onLogin}>
                    <label htmlFor="chk" aria-hidden="true">
                        Login
                    </label>
                    <input type="email" name="email" placeholder="Email" required="" />
                    <input type="password" name="pswd" placeholder="Password" required="" />
                    <button>Login</button>
                </form>
            </div>
        </div>
    );
}