import { Card, CardHeader,CardDescription} from "@/components/ui/card"
import { Label } from "@/components/ui/label"


function PrivacyPolicy() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center">
        <Card className="p-12 max-w-[800px]">
            <CardHeader className="text-4xl text-center text-primary font-bold">Privacy-Policy</CardHeader>
            <CardDescription className="flex flex-col gap-2">
                <Label className="text-primary">Data Collection :-</Label>
                <p>We only collect information you voluntarily provide (such as your name and email address) and basic usage data (via cookies) to improve our service.</p>
                <Label className="text-primary">How We Use Your Data :-</Label>
                <ul className="list-disc list-inside">
                    <li>To operate and improve the app</li>
                    <li>To provide customer support</li>
                    <li>To comply with legal obligations</li>
                </ul>
                <Label className="text-primary">Data Sharing :-</Label>
                <p>We do not sell your personal information. Data may be shared with trusted third-party service providers solely to support our operations or if required by law.</p>
                <Label className="text-primary">Data Security :-</Label>
                <p>We implement reasonable security measures to protect your data, though no system is completely secure.</p>
                <Label className="text-primary">Your Rights :-</Label>
                <p>You may request access to, or deletion of, your personal data by contacting us at <p className="text-blue-500">basharkhan7776@gmail.com</p></p>
                <p>By using this app, you agree to this Privacy Policy.</p>
            </CardDescription>
        </Card>
    </div>
  )
}

export default PrivacyPolicy