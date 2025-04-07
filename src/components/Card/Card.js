import styles from "./Card.module.css"
import Image from 'next/image'
import profileImage from "@/../public/media.jpg"
import chip from "@/../public/chip.png"
import stamp from "@/../public/stamp.png"
import logo from "@/../public/logo.png"
import barcode from "@/../public/barcode.svg"
import signature from "@/../public/sig.png"
import stamp_signature from "@/../public/stamp_sig.png"

export default function Card() {
    return (
        <div className={styles.card}>
            <div className={styles.cardInner}>
                <div className={styles.cardBack}>
                    
                    Hi - I'm JJ.
                    <div>

                        <div className={`${styles.green}`}> Great listener <br/> Health conscious <br/> Tidy (most of the time) <br/> Easygoing <br/> Sober-sipping </div>
                        <div className={`${styles.red}`}> Spider <br/> Yapper (energy--) </div>
                    </div>

                    Catch me at social events corner.

                </div>
                <div className={styles.cardFront}>
                    <div className={styles.cardFrontGrid}>
                        <Image src={logo} className={styles.cardInfo} alt="logo" width={0} height={0} priority={true}/>
                        <div className={styles.cardInfo}>บัตรประจำตัวดิจิตอล <span className={styles.eng}>Digital ID Card</span> </div>
                        <div className={styles.cardInfo}>เลขบัตรประจำตัว</div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}>Identification Number</div>
                        <div className={styles.cardInfo}>X XXXX XXXXX 74 2</div>

                        
                        <div className={styles.cardInfo}> ชื่อตัวและชื่อสกุล <span>นาย พันธกรณ์ ปรุศุดำเกิง </span></div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> Name <span>Mr. Phantakorn</span></div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> Last name <span>Prarusudamkerng</span></div>
                        <div className={styles.cardInfo}> เกิดวันที่ <span>19 ส.ค. 2544 </span></div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> Date of Birth <span>19 Aug. 2001 </span></div>
                
                        <div className={styles.cardInfo}> ที่อยู่ XX XXXX XXXX XXXX กรุงเทพมหานคร</div>

                        <div className={styles.cardInfo}> 15 มี.ค 2568 </div>
                        <div className={styles.cardInfo}> วันออกบัตร </div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> 15 Mar. 2025 </div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> Date of Issue </div>

                        <div className={styles.cardInfo}> 26 มี.ค 2576 </div>
                        <div className={styles.cardInfo}> วันบัตรหมดอายุ </div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> 26 Mar. 2033 </div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> Date of Expiry </div>

                        <div className={`${styles.cardInfo} ${styles.eng}`}> ร้อยตำรวจโท </div>
                        <div className={`${styles.cardInfo}`}> (Childish Jambino) </div>
                        <div className={`${styles.cardInfo} ${styles.eng}`}> เจ้าพนักงานออกบัตร </div>
                        
                        <div className={styles.cardInfo}> XXXX-XX-XXXXXXXX </div>
                        
                        <Image className={styles.cardInfo} src={profileImage} width={110} alt="Profile picture" priority={true}/>

                        <Image className={styles.cardInfo} src={chip} alt="Card chip" width={60} priority={true}/>

                        <Image src={stamp_signature} className={styles.stampSig} alt="signature" width={0} height={0} priority={true}/>
                        <Image src={signature} className={styles.sig} alt="signature" width={0} height={0} priority={true}/>
                        <Image src={stamp} className={styles.stamp} alt="stamp" width={0} height={0} priority={true}/>
                        <Image src={barcode} className={styles.barcode} alt="barcode" width={0} height={0} priority={true}/>

                       
                    </div>
                </div>
            </div>
        </div>
    )
}