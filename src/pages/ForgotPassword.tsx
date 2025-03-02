import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/Logo.png";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function ForgotPassword() {
  const navigate = useNavigate();
  // Steps: 'email' -> user enters email; 'otp' -> user verifies OTP; 'reset' -> user sets a new password
  const [step, setStep] = useState<'email' | 'otp' | 'reset'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { sendOtpEmail, verifyOtp, updatePassword } = useAuth();

  // Step 1: Send OTP email to user
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendOtpEmail(email);
      alert('OTP sent to your email. Please check your inbox.');
      setStep('otp');
    } catch (error: any) {
      alert(error.message || 'Failed to send OTP. Please try again.');
    }
  };

  // Step 2: Verify the OTP entered by user
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const valid = await verifyOtp(email, otp);
      if (valid) {
        alert('OTP verified. You can now set a new password.');
        setStep('reset');
      } else {
        alert('Invalid OTP. Please try again.');
      }
    } catch (error: any) {
      alert(error.message || 'OTP verification failed.');
    }
  };

  // Step 3: Update the password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
    try {
      await updatePassword(email, newPassword);
      alert('Password updated successfully. Please log in with your new password.');
      // Optionally, redirect to login page here using your router
    } catch (error: any) {
      alert(error.message || 'Failed to update password.');
    }
  };

  return (<div className="h-screen w-screen flex items-center justify-center gap-12">
    <div className="flex flex-col items-center gap-12 border border-neutral-900 hover:border-orange-500 transition-all duration-500 p-12 rounded-3xl">
      <div onClick={() => { navigate('/') }} className='flex text-3xl items-center gap-2 cursor-pointer font-script border border-gray-600 p-8 rounded-full'>
        <img src={logo} alt="Logo" className="w-12 h-12 p-2" />
        Culture Connect
      </div>
      <div>
        {step === 'email' && (
          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label>Email:</Label>
              <Input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit">Send OTP</Button>
          </form>
        )}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp}>
            <div>
              <Label>Enter OTP:</Label>
              <Input
                type="text"
                value={otp}
                onChange={e => setOtp(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" variant="default">Verify OTP</Button>
          </form>
        )}
        {step === 'reset' && (
          <form onSubmit={handleResetPassword}>
            <div>
              <Label>New Password:</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Confirm Password:</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" style={{ padding: '0.5rem 1rem' }}>Reset Password</Button>
          </form>
        )}

      </div>
    </div>
    <div className="border border-neutral-900 py-36 rounded-3xl px-8 hidden lg:block">
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 293.87389 609.15204" role="img" ><path d="m246.71663,609.15198H47.15726c-26.00249,0-47.15726-21.15448-47.15726-47.15729V47.15726C0,21.1545,21.15479,0,47.15726,0h199.55937c26.00275,0,47.15726,21.1545,47.15726,47.15726v514.83749c0,26.00275-21.15451,47.15729-47.15726,47.15729v-.00006Z" fill="#2f2e41" stroke-width="0" /><path d="m246.92003,596.42517H46.9539c-19.51083,0-35.38405-15.87347-35.38405-35.38403V45.21841c0-19.51054,15.87321-35.38405,35.38405-35.38405h199.96613c19.51053,0,35.38406,15.8735,35.38406,35.38405v515.82267c0,19.51056-15.8735,35.38403-35.38403,35.38403l-.00003.00006Z" fill="#fff" stroke-width="0" /><path d="m178.17552,43.38689h-63.63411c-7.33652,0-13.30531-5.96852-13.30531-13.30531s5.9688-13.30531,13.30531-13.30531h63.63411c7.33679,0,13.3053,5.96852,13.3053,13.30531s-5.96851,13.30531-13.3053,13.30531Z" fill="#2f2e41" stroke-width="0" /><line x1="56.819" y1="144.0567" x2="125.44164" y2="144.0567" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><line x1="56.819" y1="170.06599" x2="201.17058" y2="170.06599" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><line x1="56.819" y1="158.36182" x2="263.59285" y2="158.36182" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><circle cx="41.21342" cy="150.55904" r="11.70418" fill="#eb580d" stroke-width="0" /><line x1="56.819" y1="221.0567" x2="125.44164" y2="221.0567" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><line x1="56.819" y1="247.06599" x2="201.17058" y2="247.06599" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><line x1="56.819" y1="235.36182" x2="263.59285" y2="235.36182" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><circle cx="41.21342" cy="227.55904" r="11.70418" fill="#eb580d" stroke-width="0" /><line x1="56.819" y1="298.0567" x2="125.44164" y2="298.0567" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><line x1="56.819" y1="324.06598" x2="201.17058" y2="324.06598" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><line x1="56.819" y1="312.36182" x2="263.59285" y2="312.36182" fill="none" stroke="#090814" stroke-miterlimit="10" stroke-width="2" /><circle cx="41.21342" cy="304.55902" r="11.70419" fill="#eb580d" stroke-width="0" /></svg>
    </div>
  </div>
  )
}

export default ForgotPassword