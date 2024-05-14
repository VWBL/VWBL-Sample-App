export const en = {
  translation: {
    meta: {
      title: "'VWBL Demo App",
      description: 'This is a demo site where you can experience the core concept of VWBL (only those who have it can view the content)',
    },
    header: {
      nav: ['About VWBL', 'Create NFT'],
      connectButton: 'Connect Wallet',
      myWalletButton: 'My Wallet',
    },
    moobileMenu: {
      connectButton: 'Connect Wallet',
      myWalletButton: 'My Wallet',
      notice: '＊pcの方はmetamask chrome extention、mobileの方はmetamask appをご利用ください。',
    },
    footer: {
      nav: ['VWBL サイト', 'NFTを作成', 'まずは試してみて！'],
      copyLight: 'Ango-ya, LLC. All rights reserved.',
      myWalletButton: 'My Wallet',
    },
    hero: {
      title: ['Just try', 'the VWBL NFT'],
      description: ['持っている人だけがコンテンツを視聴することができる', 'NFTデジタルメディアプロトコル 「VWBL」', 'まずは試してみて！'],
      button: 'Try demo',
      secondaryText: 'Only you can see it.',
    },
    whatVWBL: {
      title: "What's VWBL demo",
      description: [
        'VWBL demoは "VWBL NFT" をミントできるアプリです！',
        '誰でも無料で使えて、作ったNFTは openseaなどで売ることもできるよ！',
      ],
      linkText: 'openseaなどで売ることもできるよ！',
    },
    howTo: {
      title: 'How to',
      description: '「VWBL NFT」の発行・送信方法はこちら！早速試してみよう！',
      tabs: ['Create', 'Transfer'],
      create: {
        steps: [
          {
            title: 'STEP0 Prepare Wallet',
            description: [
              'NFTを受け取るには、仮想通貨用のウォレットが必要です。',
              'VWBL Demoでは MetaMask（メタマスク） をご利用ください。',
              'PCの方：Chromeブラウザ',
              'Mobileの方：Metamask app内ブラウザ でVWBL Demoを開いてください。',
            ],
            linkText: 'MetaMask（メタマスク）',
          },
          {
            title: 'STEP1 Connect Wallet',
            description: ['メニューの「Connect Wallet」クリックし、Metamask Walletを接続する。'],
          },
          {
            title: 'STEP2 Create Item for Free',
            description: [
              'メニューの「Create」をクリックしVWBL NFT作成ページを開き、デジタルコンテンツの情報を入力する。',
              '全て入力したらページ下部「Create Item」ボタンでVWBL NFTを発行する。 アイテムの作成には数分かかる場合があります。',
            ],
          },
          {
            title: 'STEP3 Check your wallet',
            description: [
              '「My Wallet」をクリックし、保有しているVWBL NFTを表示する。',
              'VWBL NFTを選択した後、「View Data」をクリックしNFT保有者だけみることができる画像を閲覧する。',
            ],
          },
        ],
      },
      transfer: {
        steps: [
          {
            title: 'STEP0 Prepare Wallet',
            description: [
              'NFTを受け取るには、仮想通貨用のウォレットが必要です。',
              'VWBL Demoでは MetaMask（メタマスク） をご利用ください。',
              'PCの方：Chromeブラウザ',
              'Mobileの方：Metamask app内ブラウザ でVWBL Demoを開いてください。',
            ],
            linkText: 'MetaMask（メタマスク）',
          },
          {
            title: 'STEP1 Connect Wallet',
            description: 'メニューの「Connect Wallet」クリックし、メタマスクなどの仮想通貨ウォレットを接続する。',
            gifDescription: 'Wallet接続のデモンストレーション',
          },
          {
            title: 'STEP2 Check your wallet',
            description: '「My Wallet」をクリックし、保有しているVWBL NFTを表示する。',
          },
          {
            title: 'STEP3 Transfer',
            description: '詳細ページに遷移した後、「Transfer」をクリックする。送信先のウォレットアドレスを入力し、送信する。',
          },
        ],
        buttonText: 'My Wallet',
      },
      extraLinks: 'VWBL NFTをOpenSeaで販売するには？',
      tryDemoButton: 'Try demo',
      walletButton: 'My Wallet',
    },
    newNFT: {
      createNewItem: 'Create New Item',
      forFree: 'for Free',
      assetLabel: 'Asset',
      assetDescription: 'Only those with NFT will be able to view it.',
      imageVideoAudioPDF: 'Image, Video, Audio, or PDF',
      assetRequired: 'Asset is required',
      fileTooLarge: 'uploaded file is too large',
      thumbnailLabel: 'Thumbnail',
      thumbnailDescription: 'Anyone can see it. Imagine it as a preview.',
      thumbnailRequired: 'Thumbnail is required',
      image: 'Image',
      titleLabel: 'Title',
      titlePlaceholder: 'Enter a title of your item',
      titleRequired: 'Title is required',
      minLengthTitle: 'Minimum length should be 4',
      descriptionLabel: 'Description',
      descriptionPlaceholder: 'Enter a description of your item',
      descriptionRequired: 'Description is required',
      minLengthDescription: 'Minimum length should be 4',
      withPreservedLineBreaks: 'With preserved line-breaks',
      termsOfService: 'terms of service',
      Agreetothe: 'I agree to the Terms of Use',
      createItemForFree: 'Create Item for Free',
      creatingYourNFT: 'Creating Your NFT',
      loadingInstructions: ['Creating a new item may take a few minutes.', 'Please do not move to another page while loading.'],
      modalOpen: 'Click cancel',
      modalCancel: 'Toggle modal',
    },
    filePreviewer: {
      maxSize: 'Max 1.5GB',
      buttonText: 'Choose FIle',
    },
    notifications: {
      notInstalled: {
        title: 'Metamask is Required',
        message: 'Please Install Metamask in Your Browser!',
      },
      notConnected: {
        title: 'Not Connected',
        message: 'No active connection to Metamask.\n Please connect to continue.',
      },
      loadFailed: {
        title: 'Failed to Load NFTs',
        message: 'Failed to load NFTs.\n Please reload your browser or try again later.',
      },
      decryptFailed: {
        title: 'Failed to Decrypt Your NFT',
        message: 'Something went wrong and failed to decrypt your NFT.\n Please try again later.',
      },
    },
    mintStepModal: {
      header: 'Follow the steps',
      steps: [
        {
          title: 'Sign',
          description: 'Sign a message to start using VWBL',
        },
        {
          title: 'Upload',
          description: 'Uploading of all media assets and metadata to IPFS',
        },
        {
          title: 'Mint',
          description: 'Send transaction to create your NFT',
        },
        {
          title: 'Set key',
          description: 'Save decryption key to VWBL Network',
        },
      ],
      finalMessage: 'You have minted your VWBL NFT! 🎉',
      links: {
        myPage: 'My page',
      },
      buttons: {
        start: 'Start',
        inProgress: 'In Progress...',
        minted: 'Minted',
        cancel: 'Cancel',
      },
    },
    transferModal: {
      loading: {
        header: 'Transferring',
        body: 'Transferring your NFT',
      },
      complete: {
        header: 'Complete',
        body: 'Your NFT was successfully transfered',
        button: 'Close',
      },
      main: {
        header: 'Transfer NFT',
        labels: {
          title: 'Title',
          description: 'Description',
          walletAddress: 'Wallet Address',
        },
        form: {
          walletAddress: {
            placeholder: 'Wallet Address',
            required: 'Wallet Address is required',
            invalid: 'Invalid Wallet Address',
          },
          buttons: {
            transfer: 'Transfer',
            transfering: 'Transfering Your NFT',
            cancel: 'Cancel',
          },
        },
      },
    },
    receiveNFT: {
      errors: {
        walletNotConnected: {
          title: 'Wallet Not Connected',
          message: 'Please connect your wallet in order to create your nft.',
        },
        userDeniedSign: {
          title: 'User Denied Sign',
          message: 'In order to create your nft, please sign',
        },
      },
      success: {
        title: 'Successfully received',
        message: 'You have successfully received NFT',
      },
    },
    account: {
      wallet: 'Wallet Address',
      owned: 'owned',
      created: 'created',
    },
  },
};
