import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {Link} from "react-router-dom";

interface Props {
  className?:string;
  username:string;
  setUsername:any;
  password:string;
  setPassword:any;
  email:string;
  setEmail:any;
  handleSignup:any;
  rePassword:string;
  setRePassword:any;
}

export function SignupForm({
  className,
  ...props
}: Props) {


  return (
    <form className={cn("flex flex-col gap-6", className)} {...props} onSubmit={props.handleSignup}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to Signup to your account
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label >Username</Label>
          <Input 
          id="username" 
          placeholder="username" 
          required 
          value={props.username}
          onChange={(e)=> props.setUsername(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input 
          id="email" 
          type="email" 
          placeholder="m@example.com" 
          required 
          value={props.email}
          onChange={(e)=> props.setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
          id="password" 
          type="password" 
          required
          value={props.password}
          onChange={(e)=> props.setPassword(e.target.value)}
           />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Re-enter your password</Label>
          </div>
          <Input 
          id="rePassword" 
          type="password" 
          required 
          value={props.rePassword}
          onChange={(e)=> props.setRePassword(e.target.value)}
          />
        </div>
        <Button type="submit" className="w-full">
          Sign Up
        </Button>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <div className="text-center text-sm">
        Have an account?{" "}
        <Link to={'/login'} className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  )
}
