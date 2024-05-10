export const ja = {
  translation: {
    meta: {
      title: "'VWBL Demo App",
      description: 'VWBLのコアコンセプト(持っている人だけがコンテンツを視聴できる)が体験できるデモサイトです',
      image: 'https://demo-app.vwbl-protocol.org/ogp.png',
    },
    header: {
      nav: ['VWBL について', 'NFTを作成'],
      connectButton: 'ウォレットを接続',
      myWalletButton: 'ウォレット',
    },
    moobileMenu: {
      connectButton: 'ウォレットを接続',
      myWalletButton: 'ウォレット',
      notice: '＊pcの方はmetamask chrome extention、mobileの方はmetamask appをご利用ください。',
    },
    footer: {
      nav: ['VWBL サイト', 'NFTを作成', 'まずは試してみて！'],
      copyLight: 'Ango-ya, LLC. All rights reserved.',
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
        '誰でも無料で使えて、作ったNFTは OpenSeaなどで売ることもできるよ！',
      ],
      linkText: 'OpenSeaでの販売方法',
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
      createNewItem: 'VWBL NFT を作成 ',
      forFree: '無料',
      assetLabel: '実データ',
      assetDescription: 'NFTをお持ちの方のみ閲覧可能です。',
      imageVideoAudioPDF: '画像, ビデオ, 音楽, or 文書（PDF）',
      assetRequired: '必須項目です',
      fileTooLarge: 'データが大きすぎます。最大 1.5GBです。',
      thumbnailLabel: 'サムネイル',
      thumbnailDescription: '誰でも見ることができます。プレビューのようなものです。',
      thumbnailRequired: '必須項目です',
      image: '画像',
      titleLabel: 'タイトル',
      titlePlaceholder: 'アイテムのタイトルを入力してください',
      titleRequired: '必須項目です',
      minLengthTitle: '4文字以上入力してください',
      descriptionLabel: '概要',
      descriptionPlaceholder: 'アイテムについての説明を入力してください',
      descriptionRequired: '必須項目です',
      minLengthDescription: '4文字以上入力してください',
      withPreservedLineBreaks: '改行を保持した場合',
      Agreetothe: '同意する',
      termsOfService: '利用規約',
      createItemForFree: 'VWBL NFT を作成する',
      creatingYourNFT: 'Creating Your NFT',
      loadingInstructions: [' 新しいアイテムの作成には数分かかる場合があります。', '読み込み中は別のページに移動しないでください。'],
      modalCancel: 'Toggle modal',
    },
    filePreviewer: {
      maxSize: '最大1.5GB',
      buttonText: 'ファイルを選択する',
    },
    notifications: {
      notInstalled: {
        title: 'Metamaskが必要です',
        message: 'ブラウザにMetamaskをインストールしてください！',
      },
      notConnected: {
        title: '接続されていません',
        message: 'Metamaskに接続されていません。\n接続して続行してください。',
      },
      loadFailed: {
        title: 'NFTの読み込みに失敗しました',
        message: 'NFTの読み込みに失敗しました。\nブラウザを再読み込みするか、後ほど再試行してください。',
      },
      decryptFailed: {
        title: 'NFTの復号に失敗しました',
        message: '何らかの問題が発生し、NFTの復号に失敗しました。\n後ほど再試行してください。',
      },
    },
    mintStepModal: {
      header: 'ステップに従ってください',
      steps: [
        {
          title: '署名',
          description: 'VWBLを使用するためにメッセージを署名してください',
        },
        {
          title: 'アップロード',
          description: 'すべてのメディア資産とメタデータをIPFSにアップロード',
        },
        {
          title: 'ミント',
          description: 'トランザクションを送信してNFTを作成',
        },
        {
          title: 'キーの設定',
          description: 'VWBLネットワークに復号化キーを保存',
        },
      ],
      finalMessage: 'VWBL NFTをミントしました！🎉',
      links: {
        myPage: 'マイページ',
      },
      buttons: {
        start: '開始',
        inProgress: '進行中...',
        minted: 'ミント完了',
        cancel: 'キャンセル',
      },
    },
    transferModal: {
      loading: {
        header: '転送中',
        body: 'NFTを転送しています',
      },
      complete: {
        header: '完了',
        body: 'NFTの転送が成功しました',
        button: '閉じる',
      },
      main: {
        header: 'NFTを転送',
        labels: {
          title: 'タイトル',
          description: '説明',
          walletAddress: 'ウォレットアドレス',
        },
        form: {
          walletAddress: {
            placeholder: 'ウォレットアドレス',
            required: 'ウォレットアドレスは必須です',
            invalid: '無効なウォレットアドレス',
          },
          buttons: {
            transfer: '転送',
            transfering: 'NFTを転送中',
            cancel: 'キャンセル',
          },
        },
      },
    },
    receiveNFT: {
      errors: {
        walletNotConnected: {
          title: 'ウォレット未接続',
          message: 'NFTを作成するには、ウォレットを接続してください。',
        },
        userDeniedSign: {
          title: '署名が拒否されました',
          message: 'NFTを作成するためには、署名してください。',
        },
      },
      success: {
        title: '正常に受信しました',
        message: 'NFTを正常に受信しました',
      },
    },
  },
};
