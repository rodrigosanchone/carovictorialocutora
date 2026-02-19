export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="mt-10 border-t border-gray-200 dark:border-gray-700 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
      <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
        Caro Victoria: Locutora. Locución Comercial. Radio. TV. Podcast.
        Animación de Eventos. Maestra de Ceremonia. Actuación. Teatro. Doblaje.
        🎤🎙️📻📡📺🎭✍️
      </p>
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        {/* YouTube */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.youtube.com/@carovictorialocutora?si=LH4Z_7dTzBsXYEbN"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Fyoutube_4494485.png?alt=media&token=c712a602-66c4-47fa-8a20-7a616a6a1b99"
            alt="youtube"
          />
        </a>
        {/* Facebook */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.facebook.com/profile.php?id=61577588559780&mibextid=wwXIfr&rdid=xC5zVaXjA2Qn85M8&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17zGawNJ4N%2F%3Fmibextid%3DwwXIfr#"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Ffacebook-logo_2504792.png?alt=media&token=cb0ce98c-7148-44e0-824e-966f8de84ae2"
            alt="facebook"
          />
        </a>
        {/* Instagram */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.instagram.com/carovictorialocutora?igsh=cnhmMHhpdHVvbWYw&utm_source=qr"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Finstagram_4494489.png?alt=media&token=39323f0a-f0a6-4892-9960-020a7633c25f"
            alt="instagram"
          />
        </a>
        {/* Twitter */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://x.com/carolocutora23?s=11"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Ftwitter_5969020.png?alt=media&token=51501e23-e068-4bea-9f0c-48874c731fb3"
            alt="twitter"
          />
        </a>
        {/* TikTok */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.tiktok.com/@carolocutora23?_r=1&_t=ZS-941tPvR5qPA"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Ftik-tok_4782345.png?alt=media&token=ae5b81c8-715e-4079-9af5-cc8902ab89ea"
            alt="tiktok"
          />
        </a>
        {/* Threads */}
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://www.threads.com/@carovictorialocutora?invite=0"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/blog-ca662.appspot.com/o/iconos%2Fthreads.png?alt=media&token=449b7a0d-c9bd-44fb-97f3-a928fc006257"
            alt="threads"
          />
        </a>
        <a
          className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-100"
          href="https://open.spotify.com/show/4XVi0xtZYnJ7wcIoUvgjGT?si=WlL4NIywQAi9Gzbo0ugHJw&nd=1&dlsi=4a2d89f5b97b45a2"
          target="_blank"
          rel="noreferrer"
        >
          <img
            className="h-10 w-10"
            src="https://firebasestorage.googleapis.com/v0/b/carovictorialocutora-ab405.firebasestorage.app/o/icons8-spotify-100.png?alt=media&token=1cd56601-8b75-43dd-b3e4-12b13497cc71"
            alt="threads"
          />
        </a>
      </div>
    </div>
  );
}
