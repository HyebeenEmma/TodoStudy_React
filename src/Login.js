import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


const Login = () => {
    const [id, setID] = useState();
    const [password, setPassword] = useState();

    return(
        <FormWrapper
        >
        <InputWrapper>
        ID
        <input
            type = "text"
            autoFocus
            placeholder = "아이디를 입력하세요"
            onChange={(e) => setID(e.target.value)}
        />
        </InputWrapper>
        <InputWrapper>
        Password
        <input
            type = "password"
            placeholder = "아이디를 입력하세요"
            onChange={(e) => setID(e.target.value)}
        />
        </InputWrapper>
        <Button type = "submit">로그인</Button>
        </FormWrapper>
    );
};