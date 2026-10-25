export let currentUser:{userId:string;email:string;displayName:string;fullName:null}|null=null;
export function asUser(id:string|null,email='',displayName=''){currentUser=id?{userId:id,email,displayName:displayName||email,fullName:null}:null;}
export async function getChatGPTUser(){return currentUser;}
