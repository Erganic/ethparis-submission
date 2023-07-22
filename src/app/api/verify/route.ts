import { SismoConnect, SismoConnectVerifiedResult, AuthType, SismoConnectConfig} from "@sismo-core/sismo-connect-server";
import { NextResponse } from "next/server";

const config: SismoConnectConfig = {
    // you will need to register an appId in the Factory
    appId: "0x7f6d87d9e732ec81f05f54993d26deba",
  }

const sismoConnect = SismoConnect({ config });

export async function POST(req: Request) {
  // verifies the proofs contained in the sismoConnectResponse
  const sismoConnectResponse = await req.json();
  // with respect to the different auths
  // and the group(s) in the claim(s)
  // i.e. user prove they own a Vault, a Twitter account
  // and they are member of the group with id "0x42c768bb8ae79e4c5c05d3b51a4ec74a"
  const result: SismoConnectVerifiedResult = await sismoConnect.verify(
    sismoConnectResponse,
    {
      // proofs in the sismoConnectResponse should be valid
      // with respect to a Vault and Twitter account ownership
      auths: [
        { authType: AuthType.VAULT }, 
        //{ authType: AuthType.TWITTER }
      ],
      //signature : {{ message: "Your message" }}
      // proofs in the sismoConnectResponse should be valid
      // with respect to a specific group membership
      // here the group with id 0x42c768bb8ae79e4c5c05d3b51a4ec74a
      //claims: [{ groupId: "0x42c768bb8ae79e4c5c05d3b51a4ec74a"}],
    }
  )

  // vaultId = hash(userVaultSecret, appId).
  // the vaultId is an app-specific, anonymous identifier of a vault
  const vaultId = result.getUserId(AuthType.VAULT)
  console.log(vaultId);
  // you can also get the twitterId of the user
  //const twitterId = result.getUserId(AuthType.TWITTER)
  return NextResponse.json(vaultId);
}