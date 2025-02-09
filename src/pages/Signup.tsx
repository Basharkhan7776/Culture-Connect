import logo from "@/assets/Logo.png"
import { useNavigate } from "react-router-dom"
import { SignupForm } from "@/components/signup-form"
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";






function Signup() {
  const { signup } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signup(username, email, password);
      alert("Signup successful! Please log in.");
      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  


  return (
    <div className="h-screen w-screen flex items-center justify-center gap-12">
      <div className="border border-neutral-900 py-60 rounded-3xl px-8 hidden lg:block">
        <svg xmlns="http://www.w3.org/2000/svg" width={320} viewBox="0 0 583.04004 529.62915" role="img" ><path id="uuid-f8ba9176-caa4-4aaa-aa33-5402b823e72a-157" d="M280.23975,106.12551c6.49095-6.6056,15.16071-8.61083,19.36388-4.47925,4.20317,4.13157,2.34783,12.83412-4.14632,19.44121-2.55795,2.67484-5.71926,4.69822-9.21949,5.90082l-27.85587,27.64088-12.69243-13.34842,28.80849-25.83183c1.14185-3.52176,3.1107-6.71878,5.74173-9.3234Z" fill="#ffb6b6" /><path d="M191.15314,83.30949l29.20626,64.7923,46.63791-25.24489,16.69085,8.85846s-38.12548,63.73886-64.22999,56.48302c-26.1045-7.25584-72.45934-73.04683-64.10735-93.35192s35.80232-11.53697,35.80232-11.53697Z" fill="#e6e6e6" /><g><path id="uuid-070545a9-7559-45f6-9b62-076b2f028fa8-158" d="M326.53975,119.88304c-6.78007-6.30849-9.02085-14.92038-5.00538-19.2346,4.01547-4.31422,12.76536-2.69677,19.547,3.61488,2.74357,2.48409,4.85236,5.58908,6.14991,9.05523l28.38986,27.09213-12.99751,13.05154-26.60745-28.0937c-3.55158-1.04544-6.80107-2.92641-9.47643-5.48548Z" fill="#a0616a" /><path d="M469.54555,124.05918l-54.79823,58.34112s-12.30572,12.17584-32.55166-5.38303c-20.24594-17.55886-42.75488-46.36646-42.75488-46.36646l12.62792-13.7435,22.36758,19.95557s13.27995,5.34356,14.20323,8.80108-1.65808,4.88765,2.49095,3.77972,4.22986-3.57946,4.48999,.1689-2.27411,8.12916,2.5193,3.88589c4.79341-4.24327,6.22354-1.66191,6.22354-1.66191l35.02349-46.39323s22.63117-17.89636,29.13744-1.85421c6.50626,16.04214,1.02135,20.47007,1.02135,20.47007Z" fill="#eb590c" /></g><g><polygon points="178.34658 515.12397 199.64263 515.1219 209.77329 432.97905 178.34231 432.98125 178.34658 515.12397" fill="#ffb6b6" /><path d="M251.30953,514.64088h0c.66308,1.11676,1.01296,4.72115,1.01296,6.01985h0c0,3.99185-3.23598,7.22797-7.22797,7.22797h-65.95139c-2.72322,0-4.93095-2.2076-4.93095-4.93095v-2.74577s-3.26255-8.25246,3.45446-18.42407c0,0,8.34835,7.96452,20.82294-4.51006l3.67865-6.66414,26.62832,19.47461,14.75968,1.81677c3.22912,.39744,6.09203-.06168,7.75304,2.73579h.00026Z" fill="#2f2e41" /></g><rect x="423.79277" y="58.07379" width="52.77628" height="77.98286" transform="translate(900.36181 194.13044) rotate(-180)" fill="#2f2e41" /><polygon points="464.72245 112.27854 462.87423 89.94297 438.29928 89.94297 432.85138 113.60704 464.72245 112.27854" fill="#a0616a" /><polygon points="464.72245 112.27854 462.87423 89.94297 438.29928 89.94297 432.85138 113.60704 464.72245 112.27854" opacity=".1" /><polygon points="194.46134 87.46728 194.89207 58.74385 177.17918 47.70229 157.91851 71.26224 194.46134 87.46728" fill="#ffb6b6" /><polygon points="194.46134 87.46728 195.60781 59.45958 177.17918 47.70229 183.44031 82.3631 194.46134 87.46728" opacity=".1" /><circle cx="446.71686" cy="70.18709" r="26.86262" fill="#a0616a" /><path d="M439.94073,41.92582s0-11.02788,10.24017-8.66476c10.24017,2.36312,13.391,6.30164,13.391,6.30164,0,0,3.93853,6.30164,10.24017,7.08935,6.30164,.78771,11.81558,18.90493,11.02788,22.84346s-4.72623,14.1787,.78771,18.90493,13.391,11.81558,11.02788,18.90493c-2.36312,7.08935-9.45247,25.20658-9.45247,25.20658,0,0,19.77327,2.89032,18.15754,15.23001,0,0-9.49278-7.35295-22.09607-7.35295-12.60329,0-11.02788-22.86517-11.02788-22.86517,0,0-.78771-14.15699-3.15082-18.09552-2.36312-3.93853,.78771-25.99429-11.02788-37.80987-11.81558-11.81558-18.11723-19.69264-18.11723-19.69264Z" fill="#2f2e41" /><path d="M443.09155,39.56271s-14.96641,3.15082-20.48035,18.11723c-5.51394,14.96641-2.72906,17.75129-2.72906,17.75129,0,0-1.21913,9.0121-7.9098,12.17222-6.69067,3.16013-1.17673,16.55112-1.17673,16.55112,0,0-1.57541,13.391-22.84346,18.11723-21.26805,4.72623,26.67056,40.96936,26.67056,40.96936,0,0-3.44665-17.10567,18.60911-17.89338,22.05576-.78771-4.31898-41.19322-4.31898-41.19322l-2.36312-25.99429s4.72623-29.93281,18.90493-33.87134c14.1787-3.93853-2.36312-4.72623-2.36312-4.72623Z" fill="#2f2e41" /><circle cx="194.51657" cy="36.18044" r="31.50161" fill="#ffb6b6" /><path d="M237.47831,277.4009l-29.34514,199.69007h-36.81741l4.89565-113.98797,2.57663-59.93564-7.47228-28.52919s-3.40691-6.34145-6.27701-14.02843c-3.23509-8.6747-5.79027-19.07431-1.99688-24.00574,1.39569-1.81799,5.02447-3.16358,9.95585-4.16558,3.01326-.61552,6.52038-1.0951,10.3066-1.46725,21.77265-2.15437,52.74252-.80878,52.74252-.80878l.78729,25.98117,.43663,14.50796,.20755,6.74938Z" fill="#2f2e41" /><g><polygon points="57.09417 483.30825 75.85506 493.38549 123.65611 425.81969 95.9672 410.94587 57.09417 483.30825" fill="#ffb6b6" /><path d="M121.59661,517.41485h0c.05557,1.29759-1.34212,4.63833-1.95677,5.78236h0c-1.88928,3.51646-6.27149,4.83565-9.78806,2.94631l-58.09725-31.21371c-2.39891-1.28885-3.2989-4.27844-2.00999-6.67746l1.29953-2.41877s1.03174-8.81379,11.76288-14.59501c0,0,3.58467,10.96717,20.47767,5.88219l6.39458-4.12947,14.24015,29.75813,12.1421,8.58593c2.65646,1.87839,5.39572,2.82892,5.53493,6.07937l.00023,.00012Z" fill="#2f2e41" /></g><path d="M237.27076,270.65152l-15.5744,31.22752-45.48495,61.22396-74.88019,100.79698-32.43-17.42101,88.8943-149.6745,6.92831-28.67234s0-3.09914,.31493-7.52238c.61557-8.75343,2.46213-22.70309,7.95897-28.17132,.74439-.74435,1.55318-1.33126,2.43352-1.72495,1.65335-.74435,4.40179-.56541,7.87309,.2577,14.5008,3.46413,41.56274,18.34429,53.52981,25.17239l.43663,14.50796Z" fill="#2f2e41" /><g><polygon points="462.72147 517.62917 444.41088 517.62739 435.70042 447 462.72515 447.00189 462.72147 517.62917" fill="#a0616a" /><path d="M399.98707,517.2138h0c-.57013,.9602-.87096,4.0593-.87096,5.17594h0c0,3.43224,2.78234,6.21469,6.21469,6.21469h56.70578c2.34146,0,4.23969-1.89812,4.23969-4.23969v-2.36084s2.80518-7.09556-2.97019-15.84123c0,0-7.17801,6.84799-17.9038-3.8778l-3.16294-5.72991-22.89534,16.7445-12.69054,1.56208c-2.77643,.34172-5.238-.05304-6.66616,2.35226h-.00022Z" fill="#2f2e41" /></g><g><polygon points="534.85443 496.05084 517.9276 503.03371 482.93516 441.06897 507.91729 430.76223 534.85443 496.05084" fill="#a0616a" /><path d="M476.70488,519.5967h0c-.16075,1.10508,.7433,4.08461,1.16924,5.11681h0c1.30922,3.17273,4.94254,4.68349,8.11537,3.37423l52.41831-21.63023c2.16442-.89314,3.1951-3.37182,2.30191-5.53634l-.90054-2.18234s-.1135-7.6291-8.7882-13.51052c0,0-4.02315,9.06825-18.02929,3.24474l-5.10945-4.09018-14.77712,24.21181-11.13517,6.28474c-2.43616,1.37494-4.86219,1.94899-5.26487,4.71719l-.00021,.00009Z" fill="#2f2e41" /></g><path d="M471.12285,275.3539l-7.47228,28.52919,1.98976,46.29374,3.29953,76.89141,.09305,2.1687,.37215,8.64605,1.71778,39.92372h-36.81741l-16.39035-111.533-12.95479-88.15707,1.35991-44.89092,.07156-2.34759s65.84762-2.86294,73.00497,6.44162c7.15735,9.30456-8.2739,38.03417-8.2739,38.03417Z" fill="#2f2e41" /><path d="M522.34801,449.1057l-6.24123,3.22797-23.08245,11.94562-3.37825,1.7464-20.24101-28.14271-51.48998-71.60928-12.95479-88.15707,1.35991-44.89092c5.82605-1.85373,10.48549-2.61241,12.84741-1.51019,10.63586,4.97437,10.12767,37.58325,10.12767,37.58325l6.47739,28.77256,29.86765,52.1055,56.70767,98.92887Z" fill="#2f2e41" /><g><path d="M389.22568,457.90927c-.47377-1.44977-4.06457-.81151-4.40934-2.10824-.34356-1.29205,3.10208-2.37546,5.74471-6.0166,.47659-.65663,3.47971-4.79454,2.32792-6.53493-2.1832-3.29889-17.37315,4.91735-21.01925,.30668-.80021-1.01185-1.12945-2.74897-3.51323-5.98179-.94834-1.28608-1.55674-1.90695-2.28368-1.88858-1.03148,.02605-1.40054,1.31645-3.02171,3.6539-2.43126,3.50548-3.30863,3.06537-4.91026,5.93759-1.18896,2.13218-1.32986,3.49456-2.18725,3.57485-1.21329,.11366-1.71462-2.541-3.19716-2.64399-1.51285-.10505-3.02669,2.51801-3.77715,4.56737-1.40831,3.84577-.53624,6.78524-.34288,9.71471,.21009,3.18358-.28322,7.84383-3.74231,13.82532l-32.62657,51.98212c7.00688-10.59699,26.89671-39.49402,34.91025-50.09355,2.31337-3.05985,4.79938-6.13237,8.62575-6.7104,3.68391-.55655,8.16629,1.26605,14.42272,1.15995,.73067-.01235,2.76413-.07277,3.25876-1.15056,.40895-.89103-.60642-1.66577-.23705-2.50334,.49543-1.12348,2.72444-.64148,5.76213-1.3876,2.142-.52616,3.59724-1.39546,4.84866-2.14304,.37729-.22538,5.99771-3.62994,5.36699-5.55987h-.00005Z" fill="#f2f2f2" /><path d="M303.77069,470.04589c-.84826-.1858-1.57104,1.76077-2.30695,1.55583-.73329-.20418-.27085-2.20792-1.29544-4.55554-.18477-.42335-1.34918-3.09126-2.53573-3.02808-2.24903,.11969-2.59924,9.94565-5.91422,10.40488-.72749,.1008-1.6751-.23883-3.94957-.00161-.90484,.09438-1.38511,.21384-1.58585,.57593-.28481,.51376,.242,1.06725,.92149,2.53732,1.01901,2.20471,.54984,2.50836,1.49742,4.12317,.70344,1.19875,1.33145,1.66101,1.12346,2.10497-.29428,.62828-1.74186,.1084-2.22016,.8063-.48806,.71221,.36256,2.21204,1.15186,3.17166,1.48121,1.80084,3.17552,2.22095,4.66911,2.97131,1.62314,.81545,3.7681,2.40221,5.70578,5.82582l16.09936,31.01183c-3.17937-6.4966-11.62337-24.59637-14.51351-31.58779-.83433-2.01827-1.62503-4.12495-.80468-6.16976,.78977-1.96868,2.97762-3.64276,4.73073-6.74407,.20476-.3622,.76182-1.37766,.37558-1.9314-.31933-.4578-.99255-.18297-1.29706-.60594-.40845-.56734,.47126-1.52227,.98149-3.22847,.35979-1.20312,.35301-2.16817,.34718-2.99809-.00176-.2502-.05108-3.99105-1.18026-4.23835l-.00002,.00008Z" fill="#f2f2f2" /><path d="M319.83224,477.61255l.50604-4.67213,.31037-.29352c1.43597-1.35712,2.33428-2.7949,2.67125-4.27469,.05362-.23525,.09515-.47323,.13765-.71557,.16805-.96064,.37666-2.15483,1.30023-3.39519,.51688-.69106,1.88417-2.25297,3.29433-1.7074,.3806,.14266,.63749,.3894,.81596,.651,.0448-.04544,.0907-.09067,.13977-.1398,.60913-.59194,1.03526-.80879,1.44573-1.01761,.31541-.1607,.6411-.32602,1.19227-.76686,.2418-.19328,.43542-.36728,.59856-.51342,.4948-.44183,1.12772-.95917,1.99465-.75426,.91899,.25119,1.23408,1.12781,1.44313,1.70816,.37331,1.03517,.48831,1.74704,.56439,2.21916,.0274,.17247,.05916,.3667,.0832,.42983,.20116,.50696,2.72617,.63807,3.67622,.69285,2.13561,.11588,3.98357,.21616,4.42798,1.67845,.31889,1.04614-.34572,2.18715-2.03227,3.48147-.52534,.40269-1.05058,.68062-1.50814,.88818,.28144,.2661,.50567,.62801,.5194,1.12091h0c.03089,1.16674-1.16576,2.06201-3.55656,2.66554-.59411,.15167-1.39325,.35237-2.43898,.30166-.49248-.02436-.92389-.09978-1.29169-.17026-.05484,.20957-.15541,.42743-.33669,.63421-.53212,.60912-1.39147,.764-2.55795,.42065-1.28777-.35885-2.30526-.84686-3.20309-1.27586-.78424-.37361-1.46044-.69309-2.02782-.78037-1.0553-.14758-2.03936,.50399-3.217,1.37115l-2.95093,2.21373h-.00003Z" fill="#f2f2f2" /><path d="M328.2542,451.0011l-4.64769,.69558-.36264-.22578c-1.67698-1.04479-3.29556-1.54902-4.81244-1.49962-.24117,.00781-.48188,.028-.72709,.04836-.97184,.0811-2.17991,.18224-3.61396-.39652-.79959-.32468-2.65721-1.25108-2.48717-2.7535,.04146-.40433,.21497-.71541,.42277-.95439-.05535-.03179-.11073-.06472-.17068-.09973-.72708-.43908-1.04494-.79626-1.35106-1.14036-.23545-.26434-.47799-.53744-1.04419-.95877-.2483-.18486-.46572-.32801-.64846-.44875-.5529-.36653-1.21384-.84756-1.23551-1.73812,.00987-.95264,.77791-1.47978,1.28625-1.82922,.90664-.62366,1.56604-.91549,2.00343-1.10883,.15987-.07023,.3397-.15024,.39467-.18949,.43935-.32316-.07428-2.79884-.26226-3.73173-.4296-2.09514-.80136-3.9081,.50041-4.70888,.93104-.57379,2.20331-.22036,3.8831,1.08273,.52277,.40602,.92484,.84358,1.24167,1.23354,.18601-.33973,.4792-.64847,.95251-.78671h0c1.12075-.32582,2.29026,.6046,3.48048,2.76411,.29741,.53621,.69425,1.2583,.91043,2.28269,.10135,.48254,.13781,.91897,.16295,1.29265,.21664-.00011,.45286,.04191,.69888,.16481,.72416,.36021,1.09199,1.15219,1.05572,2.36759-.02047,1.33668-.23443,2.44468-.42166,3.42196-.16247,.85337-.30001,1.58848-.24048,2.15945,.12494,1.05823,1.00478,1.84481,2.14231,2.764l2.88984,2.29291h-.00012Z" fill="#f2f2f2" /><path d="M328.88063,437.04407l.50604-4.67213,.31037-.29352c1.43597-1.35712,2.33428-2.7949,2.67125-4.27469,.05362-.23525,.09515-.47323,.13765-.71557,.16805-.96064,.37666-2.15483,1.30023-3.39519,.51688-.69106,1.88417-2.25297,3.29433-1.7074,.3806,.14266,.63749,.3894,.81596,.651,.0448-.04544,.0907-.09067,.13977-.1398,.60913-.59194,1.03526-.80879,1.44573-1.01761,.31541-.1607,.6411-.32602,1.19227-.76686,.2418-.19328,.43542-.36728,.59856-.51342,.4948-.44183,1.12772-.95917,1.99465-.75426,.91899,.25119,1.23408,1.12781,1.44313,1.70816,.37331,1.03517,.48831,1.74704,.56439,2.21916,.0274,.17247,.05916,.3667,.0832,.42983,.20116,.50696,2.72617,.63807,3.67622,.69285,2.13561,.11588,3.98357,.21616,4.42798,1.67845,.31889,1.04614-.34572,2.18715-2.03227,3.48147-.52534,.40269-1.05058,.68062-1.50814,.88818,.28144,.2661,.50567,.62801,.5194,1.12091h0c.03089,1.16674-1.16576,2.06201-3.55656,2.66554-.59411,.15167-1.39325,.35237-2.43898,.30166-.49248-.02436-.92389-.09978-1.29169-.17026-.05484,.20957-.15541,.42743-.33669,.63421-.53212,.60912-1.39147,.764-2.55795,.42065-1.28777-.35885-2.30526-.84686-3.20309-1.27586-.78424-.37361-1.46044-.69309-2.02782-.78037-1.0553-.14758-2.03936,.50399-3.217,1.37115l-2.95093,2.21373h-.00003Z" fill="#f2f2f2" /><path d="M313.81007,526.56373l-.82171-.81173,.01484-1.15423-.01484,1.15423-1.14216-.12074c.00545-.10738-.00205-.3586-.0104-.75092-.04394-2.1493-.18033-8.69064,.73053-18.74134,.63602-7.01599,1.69884-14.13778,3.15893-21.17099,1.46254-7.04419,2.98044-12.28545,4.19961-16.49813,.92006-3.17731,1.84872-6.19098,2.75527-9.12643,2.41929-7.8428,4.70359-15.25129,6.11819-23.70171,.31677-1.88632,.97422-5.81304-.37183-10.44772-.78099-2.68799-2.11817-5.21813-3.9758-7.5178l1.79792-1.45198c2.04981,2.54122,3.52852,5.34326,4.39588,8.32777,1.49243,5.13864,.77611,9.41732,.43194,11.47311-1.4398,8.5996-3.74689,16.07927-6.18998,23.99762-.90191,2.9249-1.8276,5.92538-2.74362,9.08973-1.20814,4.17359-2.7124,9.36932-4.15592,16.32304-1.44363,6.94906-2.49282,13.9838-3.1218,20.91126-.8988,9.92402-.76377,16.36802-.71957,18.48502,.02285,1.13031,.02779,1.36707-.33547,1.73198v-.00003Z" fill="#f2f2f2" /><path d="M319.51852,420.33531c-.09244-.02062-.18549-.04368-.27865-.0714-1.89619-.53152-3.41721-2.07683-4.52205-4.59214-.51712-1.18278-.63919-2.42762-.8826-4.91022-.03822-.38283-.20697-2.31967,.00049-4.88654,.13497-1.67735,.31529-2.35105,.77175-2.88,.5069-.58933,1.18983-.92682,1.91151-1.09625,.01951-.22209,.09217-.43923,.23631-.64507,.59368-.85415,1.58744-.50311,2.12664-.32047,.27167,.09756,.61021,.22159,.99101,.28572,.59844,.10345,.95577-.00171,1.49668-.15833,.51757-.15027,1.16111-.33713,2.05058-.32127,1.7552,.02412,3.05448,.81297,3.48294,1.07257,2.25643,1.35583,3.0355,3.51892,3.93708,6.02354,.17914,.50205,.77368,2.31667,.91213,4.65341,.09994,1.68584-.12096,2.37592-.37426,2.86931-.51738,1.01443-1.30961,1.48465-3.27584,2.47399-2.05419,1.03671-3.08483,1.55544-3.92988,1.82211-1.96641,.6173-3.2012,1.00498-4.65383,.68099v.00005Z" fill="#f2f2f2" /></g><path d="M583.04004,528.78912h0c0,.46393-.3761,.84003-.84003,.84003H0v-1.68005H582.20001c.46393,0,.84003,.3761,.84003,.84003Z" fill="#e6e6e6" /><path d="M161.96826,65.18546l35.78675,17.17764s37.93396,112.3704,37.93396,118.09628c0,5.72588,10.73603,9.30456,4.29441,15.74617s11.98962,11.89698,2.05827,17.04238-71.88468,33.29009-78.7736,30.75207c-19-7,.80515-32.72175,.80515-32.72175,0,0-14.27243-11.49403-12.12523-17.21991s-12.88323-115.23334-12.88323-115.23334l22.90352-33.63955Z" fill="#e6e6e6" /><path d="M192.59279,43.72564l4.05176,8.10351s4.05176-14.58632,10.53456-17.82772,7.29316-8.10351,7.29316-8.10351c0,0,8.10351,10.53456,13.77597,8.10351s8.10351-4.05176,1.6207-13.77597-4.86211-4.86211-4.86211-4.86211c0,0-5.67246-8.10351-4.86211-5.67246s-4.86211-6.48281-4.86211-4.05176c0,2.43105-4.05176-4.86211-4.05176-2.43105,0,2.43105-17.01737-5.67246-14.58632-2.43105s-14.58632-6.48281-22.68983,6.48281c-8.10351,12.96562-19.33995,10.56788-15.34243,18.65473,3.99752,8.08685,2.37682,29.96633,2.37682,29.96633h11.17583s11.514-21.87948,20.42787-12.15527Z" fill="#2f2e41" /><path d="M431.08463,112.42397l.65554-.18526,32.26827-9.11929,25.76646,35.07102-17.17764,73.00497,6.44162,29.34514s-52.24866-13.59897-73.00497-2.14721c0,0-1.43147-6.52615,0-9.70469s3.57868-16.40555,1.43147-22.31741,4.29441-33.82552,4.29441-33.82552c0,0-2.14721-18.60911,7.15735-27.91367s12.1675-32.20808,12.1675-32.20808Z" fill="#eb590c" /><path d="M401.77829,244.24922l-113.38773-56.35015c-.56406-.28028-1.05683-.66646-1.46502-1.14734l-17.69208-20.85102c-1.1732-1.38289-1.42728-3.33439-.64689-4.9717l33.17439-69.60104c.58119-1.21969,1.66318-2.1203,2.96848-2.47117,1.30636-.35018,2.69344-.11288,3.80793,.65143l79.96487,54.85193c1.64151,1.12568,2.37507,3.16734,1.82498,5.08039l-16.23509,56.49833c-.44384,1.5454,.12197,3.23164,1.40805,4.19621l32.11721,24.08791c1.72958,1.29727,2.32719,3.66325,1.42134,5.62593l-1.01594,2.20137c-.52702,1.1421-1.47096,2.00112-2.6571,2.4191-.5029,.17719-1.02153,.26526-1.53806,.26526-.70211-.00035-1.40002-.16286-2.04935-.48543Z" fill="#eb590c" /><path d="M400.87344,230.53454l-31.5639-26.26032c-.27198-.229-.48669-.50814-.63701-.8159-.28627-.57974-.34354-1.27403-.12883-1.91104l17.98642-52.62797c.46525-1.35991-.03578-2.87727-1.22392-3.69322l-74.93742-51.30388c-.76584-.52964-1.72495-.69424-2.62678-.45804-.90895,.23616-1.66051,.85173-2.07561,1.68912l-31.59255,64.15133c-.47953,.96622-.44375,2.07561,.08588,2.99893,.06444,.12883,.14316,.25049,.2362,.36503l15.88933,20.97103c.30776,.40081,.70857,.73002,1.15949,.9519l105.97173,51.31105c.44375,.21476,.92328,.32209,1.40281,.32209,.83028,0,1.66051-.32209,2.27603-.94478,.0716-.07872,.14316-.15028,.21476-.23616,.50098-.6084,.75868-1.38853,.72286-2.18303-.04294-.90179-.4652-1.7464-1.15949-2.32614Z" fill="#f2f2f2" /><path d="M286.50546,155.36807c.26211,0,.51409-.14399,.6399-.39386l25.68748-51.03317c.17789-.35332,.03565-.78353-.31733-.96107-.35402-.17858-.78318-.03565-.96107,.31733l-25.68748,51.03317c-.17789,.35332-.03565,.78353,.31733,.96107,.10345,.05207,.21318,.07654,.32117,.07654Z" fill="#eb590c" /><path d="M300.10442,163.95689c.26211,0,.51409-.14399,.6399-.39386l25.68748-51.03317c.17789-.35332,.03565-.78353-.31733-.96107-.35437-.17893-.78388-.0353-.96107,.31733l-25.68748,51.03317c-.17789,.35332-.03565,.78353,.31733,.96107,.10345,.05207,.21318,.07654,.32117,.07654Z" fill="#eb590c" /><path d="M311.55618,171.11425c.26211,0,.51409-.14399,.6399-.39386l25.68748-51.03317c.17789-.35332,.03565-.78353-.31733-.96107-.35437-.17858-.78318-.03565-.96107,.31733l-25.68748,51.03317c-.17789,.35332-.03565,.78353,.31733,.96107,.10345,.05207,.21318,.07654,.32117,.07654Z" fill="#eb590c" /><path id="uuid-03f01c0a-1974-4ec8-8b69-52a915a70377-159" d="M271.01405,164.20127c8.88152-2.62392,17.4346-.1682,19.10355,5.48434,1.66895,5.65253-4.17783,12.36013-13.06286,14.9838-3.53483,1.09673-7.28091,1.33099-10.92483,.68316l-37.77177,10.64242-4.61637-17.83164,37.72639-8.59839c2.70795-2.52461,5.98125-4.36384,9.54589-5.36369Z" fill="#ffb6b6" /><path d="M204.20546,101.00626l-5.92015,70.82372,53.02899,.5702,10.29172,15.84731s-64.27416,37.21595-83.57386,18.1998c-19.2997-19.01615-27.88704-99.03792-10.72795-112.73528,17.15909-13.69736,36.90125,7.29425,36.90125,7.29425Z" fill="#e6e6e6" /><g><path id="uuid-7eb47ac4-3db4-4d62-bd0a-b38893e38622-160" d="M377.91973,228.88223c-9.23486-.69556-16.36158-6.02431-15.91795-11.90136s8.2888-10.07585,17.52685-9.37881c3.69404,.22783,7.27981,1.33698,10.4573,3.23471l39.09125,3.44127-2.0059,18.30995-38.32408-5.33642c-3.42715,1.40047-7.1399,1.95964-10.82747,1.63066Z" fill="#a0616a" /><path d="M492.24326,142.86927l-6.38743,79.78554s-2.01215,17.19398-28.78994,16.11605-62.34577-9.53066-62.34577-9.53066l1.28519-18.61978,29.93142,1.62575s13.71019-4.11598,16.58992-1.99134,1.75596,4.85335,4.30553,1.39768,1.0698-5.43689,3.61303-2.67106,3.29831,7.7702,4.39396,1.46292,3.82435-5.1835,3.82435-5.1835l-1.60184-58.10689s6.50723-28.10882,21.60469-19.63837c15.09746,8.47044,13.57689,15.35366,13.57689,15.35366Z" fill="#eb590c" /></g></svg>
      </div>
      <div className="flex flex-col items-center gap-6 border border-neutral-900 hover:border-orange-500 transition-colours duration-500 p-12 rounded-3xl">
        <div onClick={() => { navigate('/') }} className='flex text-3xl items-center gap-2 cursor-pointer font-script border border-gray-600 p-8 rounded-full'>
          <img src={logo} alt="Logo" className="w-12 h-12 p-2" />
          Culture Connect
        </div>
        <SignupForm
          handleSignup={handleSubmit}
          username={username}
          setUsername={setUsername}
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          rePassword={rePassword}
          setRePassword={setRePassword}
        />
      </div>
    </div>
  )
}

export default Signup