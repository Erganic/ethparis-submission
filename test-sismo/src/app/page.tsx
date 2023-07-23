"use client";

import { SismoConnectButton, AuthType, SismoConnectConfig, SismoConnectResponse, useSismoConnect } from "@sismo-core/sismo-connect-react";

const config: SismoConnectConfig = {
  appId: "0x7f6d87d9e732ec81f05f54993d26deba",
}



export default async function Home() {
  //const { response, responseBytes } = useSismoConnect({ config });

  //console.log("OKKK",response);

  return (
    <div>
      <SismoConnectButton
        // the client config created
        config={config}
        // request a proof of account ownership 
        // (here Vault ownership)
        auths={[
          { authType: AuthType.VAULT },
          // { authType: AuthType.TWITTER },
        ]}
        // request a proof of group membership 
        // (here the group with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a)
        // claims={[{ groupId: "0x9bd41e6b8920cc68e31b8370e82f5a4b" },
        // { groupId: "0x1cde61966decb8600dfd0749bd371f12" }]}
        // request a message signature
        //signature={{ message: "Your message" }}
        //  a response containing his proofs 
        onResponse={async (response: SismoConnectResponse) => {
          //Send the response to your server to verify it
          //thanks to the @sismo-core/sismo-connect-server package
          const verifyResponse = await fetch("/api/verify", {
            method : "POST",
            body: JSON.stringify(response),
          });
        }}
        onResponseBytes={async (bytes: string) => {
          //Send the response to your contract to verify it
          //thanks to the @sismo-core/sismo-connect-solidity package
        }}
      />
    </div>

  )
}

