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
            <div className={styles["card-inner"]}>
                <div className={styles["card-back"]}>
                    
                    Hi - I'm JJ.
                    <div>

                        <div className={`${styles.green}`}> Great listener <br/> Health conscious <br/> Tidy (most of the time) <br/> Easygoing <br/> Sober-sipping </div>
                        <div className={`${styles.red}`}> Spider <br/> Yapper (energy--) </div>
                    </div>

                    Catch me at social events corner.

                </div>
                <div className={styles["card-front"]}>
                    <div className={styles["card-front-grid"]}>
                        <Image src={logo} className={styles["card-info"]} alt="logo" width={0} height={0} priority={true}/>
                        <div className={styles["card-info"]}>บัตรประจำตัวดิจิตอล <span className={styles.eng}>Digital ID Card</span> </div>
                        <div className={styles["card-info"]}>เลขบัตรประจำตัว</div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}>Identification Number</div>
                        <div className={styles["card-info"]}>X XXXX XXXXX 74 2</div>

                        
                        <div className={styles["card-info"]}> ชื่อตัวและชื่อสกุล <span>นาย พันธกรณ์ ปรุศุดำเกิง </span></div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> Name <span>Mr. Phantakorn</span></div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> Last name <span>Prarusudamkerng</span></div>
                        <div className={styles["card-info"]}> เกิดวันที่ <span>19 ส.ค. 2544 </span></div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> Date of Birth <span>19 Aug. 2001 </span></div>
                
                        <div className={styles["card-info"]}> ที่อยู่ XX XXXX XXXX XXXX กรุงเทพมหานคร</div>

                        <div className={styles["card-info"]}> 15 มี.ค 2568 </div>
                        <div className={styles["card-info"]}> วันออกบัตร </div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> 15 Mar. 2025 </div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> Date of Issue </div>

                        <div className={styles["card-info"]}> 26 มี.ค 2576 </div>
                        <div className={styles["card-info"]}> วันบัตรหมดอายุ </div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> 26 Mar. 2033 </div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> Date of Expiry </div>

                        <div className={`${styles["card-info"]} ${styles.eng}`}> ร้อยตำรวจโท </div>
                        <div className={`${styles["card-info"]}`}> (Childish Jambino) </div>
                        <div className={`${styles["card-info"]} ${styles.eng}`}> เจ้าพนักงานออกบัตร </div>
                        
                        <div className={styles["card-info"]}> XXXX-XX-XXXXXXXX </div>
                        
                        <Image className={styles["card-info"]} src={profileImage} width={110} alt="Profile picture" priority={true}/>
                        
                        <Image className={styles["card-info"]} src={chip} alt="Card chip" width={60} priority={true}/>

                        <Image src={stamp_signature} className={styles["stamp_sig"]} alt="signature" width={0} height={0} priority={true}/>
                        <Image src={signature} className={styles.sig} alt="signature" width={0} height={0} priority={true}/>
                        <Image src={stamp} className={styles.stamp} alt="stamp" width={0} height={0} priority={true}/>
                        <Image src={barcode} className={styles.barcode} alt="barcode" width={0} height={0} priority={true}/>

                       
                    </div>
                </div>
            </div>
        </div>
    )
}