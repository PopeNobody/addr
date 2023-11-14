export interface Chain {
  hashGenesisBlock: string;
  name: string;
  per1?: number | null;
  port: number;
  portRpc?: number | null;
  protocol: Protocol;
  seedsDns?: (string)[] | null;
  unit: string;
  versions: Versions;
  bech32?: string | null;
  messagePrefix?: string | null;
}
export interface Protocol {
  magic: number;
}
export interface Versions {
  bip32: Bip32;
  bip44: number;
  private: number;
  public: number;
  scripthash: number;
}
export interface Bip32 {
  private: number;
  public: number;
}
