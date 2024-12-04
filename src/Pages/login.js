import React, { useState } from "react";
import axios from "axios";
import { Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => { 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (!email || !password) {
      message.error("Vui lòng nhập đủ thông tin!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/users");
      const user = response.data.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        message.success("Đăng nhập thành công!");
        localStorage.setItem("user", JSON.stringify(user)); 
        setUser(user); 
        navigate("/dashboard");
      } else {
        message.error("Thông tin đăng nhập không đúng!");
      }
    } catch (error) {
      message.error("Có lỗi xảy ra, vui lòng thử lại sau!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h2>Đăng nhập</h2>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Input.Password
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <Button
        type="primary"
        block
        onClick={handleLogin}
        loading={loading}
      >
        Đăng nhập
      </Button>
    </div>
  );
};

export default Login;
