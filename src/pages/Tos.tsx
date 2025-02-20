import { Card, CardHeader, CardDescription } from "@/components/ui/card"

function Tos() {
    return (
        <div className="w-[100vw] h-[100vh] flex justify-center items-center">
            <Card className="p-12 max-w-[800px] m-4">
                <CardHeader className="text-4xl text-primary  text-center font-bold">Terms of Service</CardHeader>
                <CardDescription className="flex flex-col gap-2">
                    <p>Effective as of Feb 2025, these Terms of Service govern your access to and use of our web application. By accessing or using the Service, you acknowledge and agree to be bound by these Terms. Our Service provides Event Listing and is offered on an "as is" and "as available" basis without any warranties, whether express or implied. We reserve the right to modify, suspend, or discontinue the Service at any time without prior notice, and your continued use of the Service following any changes signifies your acceptance of the updated terms.</p>

                    <p>You agree to use the Service only for lawful purposes and in a manner that does not infringe on the rights of others. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account. All content, trademarks, logos, and other intellectual property on the Service remain the exclusive property of Culture Connect or its licensors, and no part of the Service may be reproduced or used without our explicit written permission. We take reasonable measures to protect your information; however, we cannot guarantee complete security.</p>

                    <p>Under no circumstances will Culture Connect be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the Service. These Terms shall be governed by and construed in accordance with the laws of Jurisdiction, and any disputes will be resolved exclusively in the appropriate courts of that jurisdiction. We may update these Terms from time to time, and if you continue to use the Service after changes are made, you agree to the revised Terms. If you have any questions or concerns about these Terms, please contact us at basharkhan7776@gmail.com.</p>

                    <p>By using our Service, you confirm that you have read, understood, and agree to these Terms of Service.</p>
                </CardDescription>
            </Card>
        </div>
    )
}

export default Tos