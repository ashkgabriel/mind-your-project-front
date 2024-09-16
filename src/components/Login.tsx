// src/components/Login.js

import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook useNavigate
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login falhou");
      }

      const data = await response.json();

      localStorage.setItem("token", data.access_token);
      navigate("/projects"); 
    } catch (err) {
      setError("Email ou senha inválidos");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Digite suas credenciais:</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                placeholder="Digite o e-mail de cadastro"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Senha:</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="button" variant="outline">
              Cancelar
            </Button>
            <Button type="submit">Entrar</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
