/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/raffle_contract.json`.
 */
export type RaffleContract = {
  "address": "9WVXrk3G4XLiKtaqCpViTgNuUodMLaGsqnGqhzPqxrKC",
  "metadata": {
    "name": "raffleContract",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeRaffle",
      "discriminator": [
        220,
        129,
        128,
        51,
        70,
        66,
        209,
        124
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true
        },
        {
          "name": "creator",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "enterRaffle",
      "discriminator": [
        153,
        168,
        28,
        44,
        235,
        94,
        238,
        243
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true
        },
        {
          "name": "participant",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeRaffle",
      "discriminator": [
        110,
        142,
        92,
        16,
        15,
        58,
        89,
        229
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nftMint",
          "type": "pubkey"
        },
        {
          "name": "entryFee",
          "type": "u64"
        },
        {
          "name": "maxEntries",
          "type": "u8"
        }
      ]
    },
    {
      "name": "pickWinner",
      "discriminator": [
        227,
        62,
        25,
        73,
        132,
        106,
        68,
        96
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "nftTokenAccount",
          "writable": true
        },
        {
          "name": "winnerTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "raffle",
      "discriminator": [
        143,
        133,
        63,
        173,
        138,
        10,
        142,
        200
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "raffleNotActive",
      "msg": "Raffle is not active"
    },
    {
      "code": 6001,
      "name": "maxEntriesReached",
      "msg": "Maximum entries reached"
    },
    {
      "code": 6002,
      "name": "insufficientEntryFee",
      "msg": "Insufficient entry fee"
    },
    {
      "code": 6003,
      "name": "noEntries",
      "msg": "No entries in raffle"
    },
    {
      "code": 6004,
      "name": "unauthorized",
      "msg": "unauthorized"
    }
  ],
  "types": [
    {
      "name": "raffle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "entryFee",
            "type": "u64"
          },
          {
            "name": "maxEntries",
            "type": "u8"
          },
          {
            "name": "entries",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "isActive",
            "type": "bool"
          }
        ]
      }
    }
  ]
};

export const IDL: RaffleContract = {
  "address": "9WVXrk3G4XLiKtaqCpViTgNuUodMLaGsqnGqhzPqxrKC",
  "metadata": {
    "name": "raffleContract",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "closeRaffle",
      "discriminator": [
        220,
        129,
        128,
        51,
        70,
        66,
        209,
        124
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true
        },
        {
          "name": "creator",
          "signer": true
        }
      ],
      "args": []
    },
    {
      "name": "enterRaffle",
      "discriminator": [
        153,
        168,
        28,
        44,
        235,
        94,
        238,
        243
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true
        },
        {
          "name": "participant",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "initializeRaffle",
      "discriminator": [
        110,
        142,
        92,
        16,
        15,
        58,
        89,
        229
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "nftMint",
          "type": "pubkey"
        },
        {
          "name": "entryFee",
          "type": "u64"
        },
        {
          "name": "maxEntries",
          "type": "u8"
        }
      ]
    },
    {
      "name": "pickWinner",
      "discriminator": [
        227,
        62,
        25,
        73,
        132,
        106,
        68,
        96
      ],
      "accounts": [
        {
          "name": "raffle",
          "writable": true
        },
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "nftTokenAccount",
          "writable": true
        },
        {
          "name": "winnerTokenAccount",
          "writable": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "raffle",
      "discriminator": [
        143,
        133,
        63,
        173,
        138,
        10,
        142,
        200
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "raffleNotActive",
      "msg": "Raffle is not active"
    },
    {
      "code": 6001,
      "name": "maxEntriesReached",
      "msg": "Maximum entries reached"
    },
    {
      "code": 6002,
      "name": "insufficientEntryFee",
      "msg": "Insufficient entry fee"
    },
    {
      "code": 6003,
      "name": "noEntries",
      "msg": "No entries in raffle"
    },
    {
      "code": 6004,
      "name": "unauthorized",
      "msg": "unauthorized"
    }
  ],
  "types": [
    {
      "name": "raffle",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "entryFee",
            "type": "u64"
          },
          {
            "name": "maxEntries",
            "type": "u8"
          },
          {
            "name": "entries",
            "type": {
              "vec": "pubkey"
            }
          },
          {
            "name": "nftMint",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "isActive",
            "type": "bool"
          }
        ]
      }
    }
  ]
};
