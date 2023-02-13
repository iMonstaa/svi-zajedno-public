import React from "react";
import AppHeader from "../../components/app/AppHeader";
import AppNav from "../../components/app/AppNav";
import AirQualityWidget from "../../components/app/AirQualityWidget";
import { Link } from "react-router-dom";
import Modal from "../../components/app/Modal";
import SearchModal from "../../components/app/SearchModal";
import { useState } from "react";

function Dashboard() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  return (
    <>
      <div
        className="dashboard"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          padding: "110px 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 className="sofia fw-700" style={{ fontSize: "50px" }}>
          Dobrodošli
        </h1>
        <AirQualityWidget />
        <Link to={"/app/reciklazai"}>
          <button className="logout AI">ReciklažAI 🤖</button>
        </Link>
        <button
          onClick={() => {
            setShow4(true);
          }}
          className="logout"
        >
          Reciklažna pretraga 🔎
        </button>
        <a href="https://carbon-calculator.climatehero.me/" target={"_blank"}>
          <button className="logout">ClimateHero upitnik ❓</button>
        </a>
        <button
          onClick={() => {
            setShow3(true);
          }}
          className="logout"
        >
          Korisni saveti ❗
        </button>
        <button
          onClick={() => {
            setShow2(true);
          }}
          className="logout"
        >
          Informacije o aplikaciji 📲
        </button>
        <button
          onClick={() => {
            setShow1(true);
          }}
          className="logout"
        >
          Informacije o autoru ✍️
        </button>
      </div>
      <Modal show={show3} closeModal={() => setShow3(false)}>
        <h1>Korisni saveti</h1>
        <br />
        <p>
          Održiviji način života može imati veliki uticaj na životnu sredinu i
          pomoći u zaštiti naše planete za buduće generacije. Evo nekoliko
          korisnih saveta za smanjenje otpada i očuvanje resursa:
        </p>
        <br />
        <h2>Kod kuće</h2>
        <ul>
          <li>
            <span className="fw-700">Reciklaža:</span> Pobrinite se da pravilno
            reciklirate sve predmete koji se mogu ponovo koristiti, kao što su
            papir, staklo, plastika i metal. Proverite sa svojim lokalnim
            centrom za reciklažu smernice o tome šta se može, a šta ne može
            reciklirati u vašem području.
          </li>
          <li>
            <span className="fw-700">Smanjenje potrošnje struje:</span>{" "}
            Isključite elektroniku kada nije u upotrebi, pređite na energetski
            efikasne sijalice i koristite prirodno svetlo što je više moguće.
            Smanjite svoje račune za grejanje i hlađenje tako što ćete zatvoriti
            curenje vazduha i dodati izolaciju vašem domu.
          </li>
          <li>
            <span className="fw-700">Kompostiranje:</span> Napravite kantu za
            kompost u svom dvorištu da biste smanjili količinu otpada hrane koji
            ide na deponiju. Kompostiranje je odličan način da dodate hranljive
            materije u vaše zemljište i uzgajate zdravije biljke.
          </li>
          <li>
            <span className="fw-700">Kupovina na veliko:</span> Kupovinom
            artikala na veliko, možete smanjiti otpad od ambalaže i istovremeno
            uštedeti novac.
          </li>
          <li>
            <span className="fw-700">Ponovno korišćenje predmeta:</span> Umesto
            da bacate predmete koji se još uvek mogu koristiti, pokušajte da
            pronađete nove načine da ih ponovo upotrebite. Na primer, koristite
            staru odeću kao krpe za čišćenje ili prenamenite staklene tegle kao
            vaze ili kontejnere za skladištenje.
          </li>
        </ul>
        <br />
        <h2>Usput</h2>
        <ul>
          <li>
            <span className="fw-700">Kese za višekratnu upotrebu: </span>
            Recite ne plastičnim kesama i umesto njih ponesite kese za
            višekratnu upotrebu.
          </li>
          <li>
            <span className="fw-700">
              Nosite flašu za vodu za višekratnu upotrebu:
            </span>{" "}
            Odbacite plastične flaše za vodu za jednokratnu upotrebu i ponesite
            sa sobom jednu za višekratnu upotrebu.
          </li>
          <li>
            <span className="fw-700">Izaberite javni prevoz:</span> Smanjite
            emisiju ugljen-dioksida tako što ćete izabrati javni prevoz,
            zajedničko korišćenje automobila ili vožnju biciklom umesto da
            vozite sami.
          </li>
          <li>
            <span className="fw-700">Podržite ekološke kompanije:</span>{" "}
            Potražite kompanije koje koriste održive prakse i materijale i
            podržite ih donošenjem svesnih odluka o kupovini.
          </li>
          <li>
            <span className="fw-700">Smanjite potrošnju mesa:</span> Ishrana sa
            manje mesa može imati veliki uticaj na životnu sredinu. Razmislite o
            smanjenju unosa mesa ili pokušaju bezmesnih ponedeljka. Na poslu
          </li>
        </ul>
        <br />
        <h2>Na poslu</h2>
        <ul>
          <li>
            <span className="fw-700">Reciklaža:</span> Ohrabrite svoju firmu ili
            radno mesto da se osnuje program reciklaže i da se učestvuje u
            njemu.
          </li>
          <li>
            <span className="fw-700">Smanjenje upotrebe papira:</span> koristite
            digitalne dokumente umesto papira i štampajte dvostrano kad god je
            to moguće.
          </li>
          <li>
            <span className="fw-700">
              Koristite ekološki prihvatljiv kancelarijski materijal:
            </span>{" "}
            Potražite kancelarijski materijal napravljen od recikliranih
            materijala i izbegavajte proizvode sa prevelikom ambalažom.
          </li>
          <li>
            <span className="fw-700">Podstaknite ekološke prakse:</span> dajte
            primer i ohrabrite svoje kolege da usvoje održive navike, kao što je
            gašenje svetla i elektronike kada se ne koriste.
          </li>
          <li>
            <span className="fw-700">Rad na daljinu:</span> Ako je moguće,
            razmislite o radu na daljinu jedan ili više dana u nedelji kako
            biste smanjili emisiju ugljenika od putovanja na posao.
          </li>
        </ul>
        <br />
        <p>
          Zapamtite, svako moguće učestvovanje pomaže. Praveći male promene u
          našem svakodnevnom životu, možemo imati veliki uticaj na životnu
          sredinu i raditi ka održivijoj budućnosti.
        </p>
      </Modal>
      <Modal show={show1} closeModal={() => setShow1(false)}>
        <h1>Informacije o autoru</h1>
        <h2>O meni</h2>

        <br />
        <p>
          Moje ime je Nikola. Self-taught sam web i product dizajner,
          ilustrator, kao i junior front-end developer. Od malena sam bio
          zainteresovan da naučim nove i sebi nepoznate stvari, pa sam se upravo
          tako i upoznao sa dizajnom i web programiranjem.
        </p>
        <p>
          Nakon što sam se oprobao u raznim jezicima, uključujući i python, C# i
          C/C++, zaključio sam da mi se najviše dopada web development.
        </p>
        <br />

        <h2>Softver koji koristim</h2>

        <br />
        <p>
          Naravno, sve zavisi od namene. Što se tiče programiranja, koristim
          Visual Studio Code okruženje zbog svoje fleksibilnosti i lakoće rada.
          Takođe, široka ponuda ekstenzija čini rad daleko lakšim.
        </p>
        <p>
          Što se tiče ilustracija, vektorske grafike i raster dizajna, koristim
          Adobe Illustrator, Photoshop ili Clip Studio Paint, a web dizajna,
          Figmu.
        </p>
        <br />

        <h2>Društvene mreže</h2>
        <a href="https://github.com/iMonstaa" target={"_blank"}>
          <button>GitHub</button>
        </a>
        <a href="https://instagram.com/sadmonstaa" target={"_blank"}>
          <button>Instagram</button>
        </a>
        <a
          href="https://open.spotify.com/user/1sehxr1oujfz3pjipg4yeap6q"
          target={"_blank"}
        >
          <button>Spotify</button>
        </a>
      </Modal>
      <Modal show={show2} closeModal={() => setShow2(false)}>
        <h1>Informacije o aplikaciji</h1>
        <br />

        <p>
          <span className="fw-700">SVI.ZAJEDNO();</span> je sam po sebi trebao
          da bude mini društvena mreža za deljenje ekoloških novosti i promena,
          međutim, ima daleko širi spektar funkcija.
        </p>
        <br />
        <p>
          Aplikacija je napravljena u React-u, koristeći SCSS (CSS preprocessor)
          i Vite kao build tool za Front-end, dok je Back-end sačinjen od
          Firebase-a i Google Firebase Autentikacije. Ova aplikacija nudi
          mnoštvo različitih funkcija koje mogu biti informativne prirode, ali
          mogu biti i korisne.
        </p>
        <br />
        <h2>Front-end</h2>
        <h3>React</h3>
        <p>
          React je JavaScript library koji se koristi za izradu korisničkih
          interfejsa. Pomaže developerima da naprave dinamičke i interaktivne
          aplikacije za web. Takođe olakšava ponovno korišćenje koda (code
          reuse) kroz komponente.
        </p>
        <h3>SCSS</h3>
        <p>
          Skraćenica od Sassy CSS, predstavlja veoma snažnu ekstenziju CSS-a.
          Omogućava korišćenje varijabli i nestinga, koji mogu daleko doprineti
          brzini i lakoći rada.
        </p>
        <h3>Vite</h3>
        <p>
          Moderan i brz build alat koji se koristi za build-ovanje front-end
          aplikacija. Koristi ES modules koji omogućavaju da se resursi
          učitavaju samo onda kada je to potrebno, što ubrzava učitavanje
          stranica.
        </p>
        <br />
        <h2>Back-end</h2>
        <h3>Firebase</h3>
        <p>
          Firebase je cloud platforma koja se koristi za razvoj noSQL baza
          podataka za aplikacije. Omogućava lako manipulisanje podataka u bazi,
          ali ima čak i hosting. Međutim, jedna od ključnih funkcija je Firebase
          Auth.
        </p>
        <h3>Firebase Auth</h3>
        <p>
          Firebase Auth je sistem za autentifikaciju u sklopu firebase baza
          podataka. Ovaj sistem ima daleko lakši pristup nego većina
          alternativa.
        </p>
        <br />
        <h2>Unikatne funkcije</h2>
        <h3>ReciklažAI</h3>
        <p>
          Veštačka inteligencija u Vašim rukama. ReciklažAI je alat koji koristi
          TensorFlow.JS za prepoznavanje predmeta. Kada AI prepozna element koji
          mu je poznat, ispod pregleda kamere prikazuje proces reciklaže,
          materijale koji su korišćeni u proizvodnji i tip otpada.
        </p>
        <h3>Društvena mreža</h3>
        <p>
          Mini društvena mreža za deljenje interesantnih i zabavnih činjenica,
          kao i novosti o ekologiji. Omogućava korisnicima da se povežu i
          motivišu jedni druge da zaštite sopstvenu okolinu.
        </p>
        <h3>Registraciona Captcha</h3>
        <p>
          Captcha na stranici za registraciju je sigurnosna funkcija koja
          omogućava da se spreče automatizovane registracije. Ova funkcija čini
          aplikaciju sigurnijom i sprečava lažne profile.
        </p>
        <h3>E-Mail Verifikacija</h3>
        <p>
          Bezbedonosna mera predviđena da spreči lažne profile od objavljivanja
          bez prethodno verifikovane e-mail adrese. Ova funkcija čini aplikaciju
          daleko sigurnijom.
        </p>
        <h3>AQI Widget</h3>
        <p>
          AQI ili Air Quality Index widget je vidžet koji prikazuje kvalitet
          vazduha na trenutnoj lokaciji korisnika koristeći GPS. Koristi
          OpenWeatherMap AQI API da bi povukao informacije o kvalitetu vazduha.
        </p>
        <h3>Unikatne profilne</h3>
        <p>
          Unikatne slike profila korisnika su stvorene pomoću DiceBear API-ja.
          Svaki korisnički nalog (sem naloga sa istim imenima) ima svoju
          jedinstvenu sliku.
        </p>
        <h3>Reciklažna pretraga</h3>
        <p>
          Pretraga reciklažnih centara vrši pretragu preko Google Maps-a. Jednim
          klikom, korisnik dobija automatsku pretragu svih reciklažnih centara u
          blizini.
        </p>
        <h3>ClimateHero kalkulator</h3>
        <p>
          ClimateHero je upitnik i kalkulator koji korisnicima omogućava da
          izračunaju svoj "ekološki otisak". Ovaj alat omogućava korisnicima da
          saznaju koliko oni doprinose izduvavanju ugljen-dioksida i koje korake
          mogu preduzeti da to smanje.
        </p>
      </Modal>
      <SearchModal
        show={show4}
        closeModal={() => setShow4(false)}
      ></SearchModal>
    </>
  );
}

export default Dashboard;
