import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const LoginRegister = () => {
    const onRegister = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const userName = formData.get('txt');
        const email = formData.get('email');
        const password = formData.get('pswd');

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
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
                    <button>Sign up</button>
                </form>
            </div>
            <div className="login">
                <form>
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