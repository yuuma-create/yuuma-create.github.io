document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const navLinks = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.section');
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');

    // Navigation Logic
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get target id
            const targetId = link.getAttribute('href').substring(1);
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Also update mobile tabs
            const mobileTabs = document.querySelectorAll('.mobile-tab');
            mobileTabs.forEach(t => t.classList.remove('active'));
            const activeTab = document.querySelector(`.mobile-tab[href="#${targetId}"]`);
            if (activeTab) activeTab.classList.add('active');
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Re-trigger animations in the new section
                const animatedElements = targetSection.querySelectorAll('.animate-in');
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                    el.offsetHeight; /* trigger reflow */
                    el.style.animation = null; 
                });
                
                // Scroll to top of main content
                document.querySelector('.main-content').scrollTop = 0;
            }

            // Close sidebar on mobile if open
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Mobile Tab Navigation
    const mobileTabs = document.querySelectorAll('.mobile-tab');
    mobileTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = tab.getAttribute('href').substring(1);
            
            // Remove active from all
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            mobileTabs.forEach(t => t.classList.remove('active'));
            
            // Add active to clicked tab
            tab.classList.add('active');
            
            // Also update sidebar nav
            const sidebarLink = document.querySelector(`.nav-item[href="#${targetId}"]`);
            if (sidebarLink) sidebarLink.classList.add('active');
            
            // Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                document.querySelector('.main-content').scrollTop = 0;
            }
        });
    });

    // Mobile Menu Toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Close sidebar when clicking outside (on mobile)
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Handle circle-arrow link clicks (for Featured project link)
    const circleArrows = document.querySelectorAll('.circle-arrow');
    circleArrows.forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = arrow.getAttribute('href').substring(1);
            
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            const targetLink = document.querySelector(`.nav-item[href="#${targetId}"]`);
            if (targetLink) targetLink.classList.add('active');
            
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
                document.querySelector('.main-content').scrollTop = 0;
            }
        });
    });

    // Handle "もっと見る" link click
    const moreNewsBtn = document.querySelector('.more-news-btn');
    if (moreNewsBtn) {
        moreNewsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(l => l.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            const targetLink = document.querySelector('.nav-item[href="#news"]');
            if (targetLink) targetLink.classList.add('active');
            
            const targetSection = document.getElementById('news');
            if (targetSection) {
                targetSection.classList.add('active');
                document.querySelector('.main-content').scrollTop = 0;
            }
        });
    }

    // ===== Project Detail Modal =====
    const projectModal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    const projectCards = document.querySelectorAll('.project-card[data-project]');

    // Project Data with full details
    const projectData = {
        sprout: {
            badge: '🌐 App Store公開中',
            title: 'Sprout - プレーンテキストエディタ',
            subtitle: 'ウィジェットやブラウザ機能を統合した、思考を"育てる"ためのiOSネイティブメモアプリ',
            images: [
                { src: '../image/sprout_browser.png', alt: 'ブラウザ一体型メモ: 調べて、そのまま書く' },
                { src: '../image/sprout_search_replace.png', alt: '検索・置換機能: 文章作成をもっと速く' },
                { src: '../image/sprout_ai_format.png', alt: 'AI文章整形: 不要な記号・改行を自動除去' },
                { src: '../image/sprout_widget.png', alt: 'ウィジェット: ホーム・ロック画面で一目確認' },
                { src: '../image/sprout_reminder.png', alt: 'リマインダー: 「あとで」を確実に通知' },
                { src: '../image/sprout_customization.png', alt: 'カスタマイズ: 文字サイズもカラーも自由自在' }
            ],
            overview: '動作の軽快さとシンプルさを追求したiOSネイティブメモアプリ。余計な装飾を排したプレーンテキストエディタに、Webブラウザとウィジェット機能を統合。日々のメモ書きや、Web情報のストックをストレスなく行えるツールとして開発しました。',
            motivation: '既存の「高機能すぎる」メモアプリは起動が遅かったり、機能が複雑で使いこなせないことがありました。「もっと手軽に、起動してすぐに書き始めたい」「ホーム画面にメモを置いて忘れないようにしたい」という原点回帰のニーズに応えるため、SwiftUIで軽量なネイティブアプリを自作しました。',
            features: [
                { icon: '📝', title: 'プレーンテキストエディタ', desc: 'SwiftUIの標準コンポーネントを活かした、極めてシンプルで軽量なエディタ。起動が爆速で、「書くこと」に集中できる。' },
                { icon: '🌐', title: 'アプリ内ブラウザ統合', desc: 'WKWebViewベースのブラウザを内蔵。Web閲覧中にスムーズにメモを取ることができ、ChatGPT等のAIツールも並行して参照可能。' },
                { icon: '📱', title: 'ホーム画面ウィジェット', desc: 'WidgetKitを活用。Pinned Note機能でホーム画面に重要メモを常駐。ワンタップで編集再開。' },
                { icon: '📂', title: 'ファイルベース管理', desc: '標準のFileManagerを使用し、オープンなファイルシステムでメモを管理。データの透明性を確保。' },
                { icon: '☁️', title: 'iCloud Drive同期', desc: 'iCloud Driveを利用したデバイス間同期に対応。Macのファイルアプリなどからもアクセス可能。' }
            ],
            tech: ['Swift', 'SwiftUI', 'iOS 17+', 'FileManager', 'WidgetKit', 'WebKit', 'AppIntent'],
            period: '約3週間（機能実装・UI調整・審査準備）',
            achievements: [
                'SwiftUIとUIKit (WKWebView) のブリッジ実装による技術的知見',
                'WidgetKitのライフサイクルとデータ更新頻度の最適化',
                'iOSサンドボックス環境下でのファイル操作とiCloud同期の実装'
            ],
            futureVision: [
                { icon: '🔎', title: '検索機能の強化', desc: '全文検索の精度と速度向上。より快適なファイル検索体験へ。' },
                { icon: '📂', title: 'フォルダ整理', desc: 'フラットなリストだけでなく、サブフォルダ管理への対応強化。' },
                { icon: '🎨', title: 'テーマ機能', desc: 'ダークモード完全対応に加え、好みのアクセントカラーを選べる機能の実装。' }
            ],
            links: [
                { type: 'primary', icon: 'fa-brands fa-app-store-ios', text: 'App Storeで見る', url: '#' }
            ]
        },
        photosort: {
            badge: '🌐 App Store公開中',
            title: 'PhotoSort - iOS写真整理アプリ',
            subtitle: '3つの整理モードでiPhoneのストレージを最適化するネイティブアプリ',
            images: [
                { src: '../image/03_Statistics.png', alt: '統計ビュー' },
                { src: '../image/02_SwipeView.png', alt: 'スワイプモード' },
                { src: '../image/01_PhotoGrid.png', alt: 'グリッドビュー' },
                { src: '../image/04_DeleteCandidates.png', alt: '削除候補管理' },
                { src: '../image/05_ExcludedPhotos.png', alt: '次回除外リスト' }
            ],
            overview: 'iPhoneの写真・動画を効率的に整理できるネイティブiOSアプリ。統計・スワイプ・グリッドの3つの整理モードで容量の大きいファイルを素早く特定し、ストレージ管理を最適化。直感的なUIと軽快な動作が特徴です。',
            motivation: 'iPhoneで写真を大量に保存していると、気づかないうちにストレージが圧迫されます。しかし、どの写真が容量を占有しているかを確認する手段が標準アプリにはありません。「容量の大きい写真を素早く見つけて整理したい」というニーズに応えるため、Swiftでネイティブアプリとして開発しました。',
            features: [
                { icon: '📊', title: '統計ビュー', desc: 'ストレージ使用状況を可視化。写真・動画別の容量分析を提供。' },
                { icon: '👆', title: 'スワイプモード', desc: '直感的なUI。左スワイプ：削除候補、右スワイプ：保持、上スワイプ：次回除外。' },
                { icon: '🎯', title: 'グリッドビュー', desc: '容量/日付でソート可能。ピンチイン・アウトでグリッド数変更（2〜5列）。' },
                { icon: '💰', title: '広告収益化', desc: 'AdMobインタースティシャル広告による収益化。適切なタイミングで表示。' },
                { icon: '📱', title: 'iPad対応', desc: 'StackNavigationViewStyleを活用し、iPadの大画面に最適化された表示を実現。' },
                { icon: '🔒', title: 'プライバシー配慮', desc: '写真はデバイス内処理のみ。外部サーバーへの送信なし。ATT対応。' }
            ],
            tech: ['Swift', 'SwiftUI', 'iOS 17+', 'Photos Framework', 'AdMob', 'UserDefaults', 'Combine'],
            period: '約1週間（機能実装・UI調整・審査準備）',
            achievements: [
                '初のSwiftネイティブアプリ開発',
                'App Store審査を1日で通過',
                'iPad対応・広告収益化の実装'
            ],
            futureVision: [
                { icon: '☁️', title: 'iCloud連携', desc: 'iCloud Photosとの同期。クラウドストレージの最適化も視野に。' },
                { icon: '🤖', title: 'AI重複検出', desc: '類似画像を自動検出し、重複ファイルを削減。機械学習で画像比較。' },
                { icon: '📊', title: '詳細分析', desc: '撮影場所、時間帯、カメラモード別の容量分析。データ可視化の強化。' },
                { icon: '🔄', title: '自動整理提案', desc: '定期的に大容量ファイルを通知。スマートな自動削除提案機能。' }
            ],
            links: [
                { type: 'primary', icon: 'fa-brands fa-app-store-ios', text: 'App Storeで見る', url: 'https://apps.apple.com/us/app/photosort-%E5%86%99%E7%9C%9F%E6%95%B4%E7%90%86%E3%82%A2%E3%83%97%E3%83%AA/id6755087817' }
            ]
        },
        memoia: {
            badge: '🌐 Vercel公開中',
            title: 'Memoia - AI駆動型メモアプリ',
            subtitle: 'AIが目的を推測し、最適なUI・構造を自動生成する次世代メモアプリ',
            video: 'https://www.youtube.com/embed/Jf9Xfpkdj-k',
            images: [
                { src: '../image/memoia.png', alt: 'Memoia メイン画面' }
            ],
            overview: 'メモの内容をAIが分析し、テーブル形式やリスト形式など最適なレイアウトを提案する次世代メモアプリ。画像OCR、AIチャット、Stripe決済デモなど、30以上の機能を実装。Next.js 14とマルチAI APIを統合し、実用的なプロダクトとして本番公開まで実現しました。',
            motivation: '既存のメモアプリは「書く」ことに特化していますが、「書いた内容をどう整理するか」はユーザー任せでした。AIの力を使えば、入力内容から意図を理解し、最適な構造を自動提案できるのではないかと考えました。',
            features: [
                { icon: '🖼️', title: '画像OCR', desc: '写真から構造化されたメモを自動生成。Google Cloud Vision APIで高精度な文字認識。' },
                { icon: '🤖', title: 'AIチャット', desc: '複数メモを参照した高度な質問対応。Gemini/ChatGPT APIによるマルチAI統合。' },
                { icon: '📊', title: 'テーブル自動生成', desc: 'テキストから構造化テーブルに自動変換。列・行の追加削除、ドラッグリサイズ対応。' },
                { icon: '💳', title: 'Stripe決済デモ', desc: 'サブスクリプション課金システム（テストモード）。Webhook連携、顧客管理の実装。' },
                { icon: '📝', title: 'リッチエディタ', desc: 'ブロック単位での管理、マークダウン対応、テンプレート機能。' },
                { icon: '☁️', title: 'リアルタイム同期', desc: 'Firebase Firestoreで複数デバイス間で即座にデータが反映。' },
                { icon: '💡', title: 'スマートレイアウト', desc: 'AIが内容に応じて最適なUIを提案。リスト/テーブル/段落を自動判定。' },
                { icon: '🌐', title: '本番公開', desc: 'VercelでCI/CD完備。カスタムドメイン、SSL対応、グローバルCDNで高速配信。' }
            ],
            tech: ['Next.js 14', 'TypeScript', 'Firebase', 'Gemini API', 'ChatGPT API', 'Stripe', 'Tailwind CSS', 'Vercel'],
            period: '約3週間（継続開発中）',
            achievements: [
                'FlutterからReact/Next.jsへの技術領域拡大',
                'Stripe決済システムの実装経験',
                '30以上の機能を実装し本番公開'
            ],
            futureVision: [
                { icon: '🤖', title: 'AI補完機能', desc: 'Gemini API・ChatGPT APIに対応した入力予測機能。入力内容を文脈から理解し、続きを自動提案。' },
                { icon: '🎙️', title: '音声ファイル文字起こし', desc: 'AIによる音声ファイルの読み込みと自動文字起こし。構造化されたメモへの変換。' },
                { icon: '🎤', title: 'リアルタイム音声入力', desc: 'リアルタイムで音声認識・文字起こし。話しながらメモを作成できるハンズフリー機能。' },
                { icon: '🎯', title: 'AI機能の強化', desc: 'より高度な意図推測、複数AIモデルの比較活用、パーソナライズ機能の実装。' },
                { icon: '🤝', title: 'コラボレーション機能', desc: 'リアルタイム共同編集、コメント機能、権限管理システムの追加。' },
                { icon: '📱', title: 'モバイルアプリ化', desc: 'React NativeまたはFlutterでのネイティブアプリ開発。プッシュ通知やウィジェット機能の追加。' }
            ],
            links: [
                { type: 'primary', icon: 'fa-solid fa-globe', text: 'アプリを試す', url: 'https://memoia-three.vercel.app/' }
            ]
        },
        recipe: {
            badge: '📱 Flutter開発',
            title: 'Flutter レシピ管理アプリ',
            subtitle: 'AIを活用したレシピ管理・献立提案アプリ',
            images: [
                { src: '../image/FoodRecipeAIapp.jpg', alt: 'レシピ管理アプリ' }
            ],
            overview: 'AIを活用したレシピ管理アプリ。食材管理、献立提案、音声読み上げなど実用的な機能を搭載。プログラミング未経験から1ヶ月でFlutterアプリを完成させた、初めての本格的な個人開発プロジェクトです。',
            motivation: '料理をする際に「今ある食材で何が作れるか」を考えるのが面倒でした。AIに食材を伝えるだけで最適なレシピを提案してくれるアプリがあれば便利だと考え、Flutterの学習を兼ねて開発しました。',
            features: [
                { icon: '🥗', title: '食材管理', desc: '冷蔵庫の食材を登録・管理。賞味期限アラート機能。' },
                { icon: '🍳', title: 'AI献立提案', desc: '登録食材からGemini APIがレシピを提案。' },
                { icon: '🔊', title: '音声読み上げ', desc: 'TTSで調理中でも手を使わずにレシピ確認可能。' },
                { icon: '📖', title: 'レシピ保存', desc: 'お気に入りレシピをFirebaseにクラウド保存。' },
                { icon: '🔥', title: 'Firebase連携', desc: 'リアルタイムデータ同期、ユーザー認証機能。' },
                { icon: '🎨', title: 'カスタムUI', desc: 'Providerによる状態管理、直感的なインターフェース。' }
            ],
            tech: ['Flutter', 'Dart', 'Firebase', 'Gemini API', 'TTS', 'Provider'],
            period: '約1ヶ月（初めてのFlutterプロジェクト）',
            achievements: [
                '未経験から1ヶ月でアプリ完成',
                'GitHub CopilotやFirebaseを活用した効率的な開発',
                'AI API統合の基礎を習得'
            ],
            futureVision: [
                { icon: '🛒', title: '買い物リスト連携', desc: 'webviewからコピペ＆現在の在庫リストで、必要なものだけを抜き出した買い物リストを生成。' },
                { icon: '📊', title: '栄養管理機能', desc: '1日のカロリー計算、栄養バランス分析、健康目標に応じたAI提案。' },
                { icon: '👥', title: 'レシピ共有', desc: 'ユーザー間でのレシピ共有、評価システム、コメント機能。' },
                { icon: '📱', title: 'Apple Watch対応', desc: '調理中のタイマー機能、音声操作、レシピの手順表示。' },
                { icon: '🤖', title: 'AI料理アシスタント', desc: '冷蔵庫の食材写真から自動レシピ提案、調理中の質問対応。' }
            ],
            links: [
                { type: 'secondary', icon: 'fa-solid fa-shield-halved', text: 'Privacy Policy', url: '../AI_FoodRecipeApp_privacypolicy.html' }
            ]
        },
        syukatsu: {
            badge: '📱 Flutter開発',
            title: '就活効率化アプリ',
            subtitle: '就職活動を効率化するオールインワンアプリケーション',
            images: [
                { src: '../image/SyuKatsuApp.jpg', alt: '就活効率化アプリ' }
            ],
            overview: '就職活動を効率化するFlutterアプリ。企業情報の検索・整理、選考進捗の管理など就活に必要な機能を統合。自分自身の就活をより効率的にするために開発した実用ツールです。',
            motivation: '就活中、複数の企業情報やエントリー状況を管理するのが大変でした。スプレッドシートでは限界があり、専用のアプリで一元管理できれば便利だと考え開発しました。',
            features: [
                { icon: '🏢', title: '企業情報管理', desc: '企業情報を一元管理。業界、規模、志望度でカテゴリ分け。' },
                { icon: '📋', title: '選考進捗管理', desc: 'エントリーから内定まで選考ステータスを追跡。' },
                { icon: '🔍', title: 'クエリ検索', desc: 'カテゴリやタグで企業を絞り込み検索。' },
                { icon: '📅', title: 'スケジュール', desc: '面接日程やES締切をカレンダー管理。' },
                { icon: '📊', title: '統計表示', desc: '応募状況、選考通過率などを可視化。' },
                { icon: '💾', title: 'ローカル保存', desc: 'SharedPreferencesでオフラインでも利用可能。' }
            ],
            tech: ['Flutter', 'Dart', 'Provider', 'SharedPreferences'],
            period: '約2週間',
            achievements: [
                '自分の就活で実際に活用',
                'オフライン対応でいつでも利用可能',
                'Provider による効率的な状態管理'
            ],
            futureVision: [
                { icon: '🤖', title: 'AI分析機能', desc: 'Gemini APIを活用した自己分析、企業分析、面接練習機能、ES添削機能。' },
                { icon: '☁️', title: 'クラウド同期', desc: 'Firebaseを使用したマルチデバイス同期、バックアップ機能、チーム共有機能。' },
                { icon: '📊', title: '比較機能', desc: 'AIを使用することで、比較した情報を見やすい形で生成。' },
                { icon: '🔔', title: 'スマート通知', desc: '選考日程のリマインダー、企業情報更新通知、おすすめ企業のプッシュ通知。' },
                { icon: '🌐', title: '手軽に会員登録', desc: 'webviewから自分で登録した会員情報に遷移、コピペで就活サービスに登録。' },
                { icon: '👥', title: 'コミュニティ', desc: '同じ業界を目指す学生とのマッチング、情報共有フォーラム、メンター機能。' }
            ],
            links: [
                { type: 'secondary', icon: 'fa-solid fa-circle-info', text: '詳細ページ', url: '../SyuKatsuApp/index.html' }
            ]
        },
        browser: {
            badge: '🧪 TestFlight公開中',
            title: '本格ブラウザアプリ',
            subtitle: '高機能マルチタブブラウザアプリ',
            images: [
                { src: '../image/BrowserApp.jpg', alt: 'ブラウザアプリ' }
            ],
            overview: '高機能マルチタブブラウザアプリ。ドメインロック、カスタマイズUI、ジェスチャー操作など30以上の機能を搭載。TestFlightでベータテスト中で、ユーザーフィードバックを収集しながら改善を続けています。',
            motivation: '既存のブラウザアプリに不満があり、自分好みにカスタマイズできるブラウザが欲しいと考え開発しました。特にドメインロック機能は子供向けの安全なブラウジングを実現するために実装しました。',
            features: [
                { icon: '🔒', title: 'ドメインロック', desc: '特定ドメインのみアクセス可能に制限。子供向け安全機能。' },
                { icon: '📑', title: 'マルチタブ', desc: '複数タブを効率的に管理。タブプレビュー機能。' },
                { icon: '👆', title: 'ジェスチャー操作', desc: 'スワイプで進む/戻る、ピンチでズームなど直感操作。' },
                { icon: '🎨', title: 'カスタマイズUI', desc: 'テーマカラー、レイアウト、フォントサイズを自由に変更。' },
                { icon: '🔖', title: 'ブックマーク', desc: 'お気に入りページをフォルダ分けして管理。' },
                { icon: '📜', title: '履歴管理', desc: '閲覧履歴の検索・一括削除・期間指定削除。' }
            ],
            tech: ['Flutter', 'WebView', 'Provider', 'SharedPreferences', 'URL Launcher'],
            period: '約3週間',
            achievements: [
                'TestFlightでベータテスト実施',
                '30以上の機能を実装',
                'ユーザーフィードバックを反映した改善'
            ],
            futureVision: [
                { icon: '🔄', title: 'クラウド同期機能', desc: 'タブ、ブックマーク、履歴、設定のクラウド同期。複数デバイス間でのシームレスな連携。' },
                { icon: '🎨', title: 'アドオンシステム', desc: 'ユーザーが独自の機能を追加できる拡張機能システムとプラグインアーキテクチャ。' },
                { icon: '🤖', title: 'AI統合機能', desc: 'AIによる記事要約、自動翻訳、関連サイト提案、コンテンツ分析などのスマート機能。' },
                { icon: '📊', title: '使用統計・分析', desc: 'ブラウジング習慣の分析、パーソナライズされた機能提案、使用時間管理。' },
                { icon: '🔐', title: '高度なセキュリティ', desc: '生体認証、暗号化ブックマーク、安全なプライベートモード、VPN統合。' },
                { icon: '📱', title: 'マルチプラットフォーム対応', desc: 'デスクトップ版の開発、タブレット最適化、Apple Watch連携。' }
            ],
            links: [
                { type: 'primary', icon: 'fa-solid fa-plane', text: 'TestFlightで試す', url: 'https://testflight.apple.com/join/NMQdCPzF' }
            ]
        },
        dataanalysis: {
            badge: '🔬 研究プロトタイプ',
            title: '価格データ分析ツール',
            subtitle: '複数データソースからの価格情報収集・分析を自動化',
            images: [
                { src: '../image/rakuraku_kobutsu_search_py1.png', alt: 'データ分析ツール メイン画面' }
            ],
            overview: '複数データソースからの価格情報収集・分析を自動化する研究プロトタイプ。高校時代の古物商経験から着想を得て、データ可視化とGUI設計の学習を目的として開発した個人プロジェクトです。',
            motivation: '高校時代の古物商経験で、商品の価格調査に時間がかかっていました。複数サイトの価格を自動で収集・比較できるツールがあれば効率化できると考え、Pythonの学習を兼ねて開発しました。',
            features: [
                { icon: '📊', title: 'データ可視化', desc: 'Matplotlibでグラフ表示。価格帯分布、推移グラフなど。' },
                { icon: '🖥️', title: 'GUI設計', desc: 'tkinterでデスクトップアプリ化。直感的な操作性。' },
                { icon: '🔍', title: '価格検索', desc: '複数ソースから価格情報を取得・比較。' },
                { icon: '📈', title: '価格推移', desc: '時系列での価格変動を分析・予測。' },
                { icon: '💾', title: 'データ保存', desc: 'CSV/Excelでデータを保存・エクスポート。' },
                { icon: '🔄', title: 'バッチ処理', desc: '複数商品の一括検索・分析機能。' }
            ],
            tech: ['Python', 'Matplotlib', 'tkinter', 'pandas', 'requests', 'BeautifulSoup'],
            period: '約1週間',
            achievements: [
                'Pythonでのデータ分析基礎を習得',
                'GUIアプリケーション設計の経験',
                '高校時代の経験を技術に活かした'
            ],
            links: []
        }
    };

    // Open Modal with images/video support
    function openProjectModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Build media section (video or images)
        let mediaHtml = '';
        if (project.video) {
            mediaHtml = `
                <div class="modal-section modal-media">
                    <h3><i class="fa-solid fa-video"></i> デモ動画</h3>
                    <div class="modal-video-container">
                        <iframe src="${project.video}" title="デモ動画" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    </div>
                </div>
            `;
        }
        
        if (project.images && project.images.length > 0) {
            const imagesHtml = project.images.map(img => `
                <div class="modal-image-item">
                    <img src="${img.src}" alt="${img.alt}" loading="lazy" onclick="this.classList.toggle('expanded')">
                    <span class="modal-image-caption">${img.alt}</span>
                </div>
            `).join('');
            
            mediaHtml += `
                <div class="modal-section modal-media">
                    <h3><i class="fa-solid fa-images"></i> スクリーンショット</h3>
                    <div class="modal-images-grid">
                        ${imagesHtml}
                    </div>
                </div>
            `;
        }

        const featuresHtml = project.features.map(f => `
            <div class="modal-feature">
                <h4>${f.icon} ${f.title}</h4>
                <p>${f.desc}</p>
            </div>
        `).join('');

        const techHtml = project.tech.map(t => `<span>${t}</span>`).join('');

        const linksHtml = project.links.map(l => `
            <a href="${l.url}" target="_blank" class="modal-link ${l.type}">
                <i class="${l.icon}"></i> ${l.text}
            </a>
        `).join('');

        // Build achievements section if exists
        let achievementsHtml = '';
        if (project.achievements && project.achievements.length > 0) {
            achievementsHtml = `
                <div class="modal-section">
                    <h3><i class="fa-solid fa-trophy"></i> 成果・学び</h3>
                    <ul class="modal-achievements">
                        ${project.achievements.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Build future vision section if exists
        let futureVisionHtml = '';
        if (project.futureVision && project.futureVision.length > 0) {
            const visionItemsHtml = project.futureVision.map(v => `
                <div class="modal-feature future-vision-item">
                    <h4>${v.icon} ${v.title}</h4>
                    <p>${v.desc}</p>
                </div>
            `).join('');
            
            futureVisionHtml = `
                <div class="modal-section">
                    <h3><i class="fa-solid fa-rocket"></i> 今後の展望</h3>
                    <div class="modal-features">
                        ${visionItemsHtml}
                    </div>
                </div>
            `;
        }

        modalContent.innerHTML = `
            <div class="modal-header">
                <span class="badge">${project.badge}</span>
                <h2>${project.title}</h2>
                <p>${project.subtitle}</p>
            </div>

            ${mediaHtml}

            <div class="modal-section">
                <h3><i class="fa-solid fa-lightbulb"></i> プロジェクト概要</h3>
                <p>${project.overview}</p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-comment"></i> 開発の動機</h3>
                <p>${project.motivation}</p>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-star"></i> 主な機能</h3>
                <div class="modal-features">
                    ${featuresHtml}
                </div>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-code"></i> 使用技術</h3>
                <div class="modal-tech-tags">
                    ${techHtml}
                </div>
            </div>

            <div class="modal-section">
                <h3><i class="fa-solid fa-clock"></i> 制作期間</h3>
                <p>${project.period}</p>
            </div>

            ${achievementsHtml}

            ${futureVisionHtml}

            ${project.links.length > 0 ? `
            <div class="modal-links">
                ${linksHtml}
            </div>
            ` : ''}
        `;

        projectModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close Modal
    function closeProjectModal() {
        projectModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const projectId = card.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });

});
