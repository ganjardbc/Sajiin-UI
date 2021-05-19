<template>
    <div id="product">
        <div class="main-screen" style="padding-top: 20px;">
            <AppText :type="'subtitle'">Detail Pesanan</AppText>
            <div class="display-flex" style="margin-top: 20px;">
                <div class="width width-65">
                    <div class="width width-full" style="margin-bottom: 15px;">
                        <AppText style="margin-bottom: 5px;">Nomor Invoice</AppText>
                        <div class="display-flex space-between margin margin-bottom-5-px">
                            <AppText :type="'bold'">(INV/20210210/XXI/II/749859808)</AppText>
                        </div>
                    </div>
                    <div class="width width-full" style="margin-bottom: 15px;">
                        <AppText style="margin-bottom: 5px;">Status</AppText>
                        <div class="display-flex space-between margin margin-bottom-5-px">
                            <AppText :type="'bold'">Menunggu Konfirmasi</AppText>
                        </div>
                    </div>
                    <div class="width width-full" style="margin-bottom: 15px;">
                        <AppText style="margin-bottom: 5px;">Penanggung Jawab</AppText>
                        <div class="display-flex space-between margin margin-bottom-5-px">
                            <AppText :type="'bold'">Admin</AppText>
                        </div>
                    </div>
                    <div class="width width-full" style="margin-bottom: 30px;">
                        <AppText style="margin-bottom: 5px;">Tanggal Pemesanan</AppText>
                        <div class="display-flex space-between margin margin-bottom-5-px">
                            <AppText :type="'bold'">10 Feb 2021, 00:58 WIB</AppText>
                        </div>
                    </div>

                    <div class="width width-full padding padding-top-30-px padding-bottom-30-px border-top border-bottom">
                        <AppText :type="'bold'" style="margin-bottom: 5px;">Daftar produk</AppText>
                        <div v-for="(dt, index) in data" :key="index" class="display-flex padding padding-top-15-px padding-bottom-15-px">
                            <div style="width: 130px;">
                                <div class="box-shadow" style="width: 110px; height: 110px; border-radius: 5px; background-color: #f5f5f5; overflow: hidden;">
                                    <img :src="icon" alt="icon" style="position: relative; width: 100%;">
                                </div>
                            </div>
                            <div style="width: calc(100% - 130px);">
                                <div class="width width-100">
                                    <AppText type="bold">{{ dt.title }}</AppText>
                                    <AppText type="normal">{{ dt.toping }}</AppText>
                                    <AppText>Note# {{ dt.note }}</AppText>
                                    <div class="display-flex space-between margin margin-top-10-px">
                                        <AppText>{{ dt.qty }}</AppText>
                                        <AppText type="bold">{{ dt.price }}</AppText>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <AppButton
                            :onPress="onRegister"
                            style="margin: 0; margin-top: 15px; width: 100%;"
                            title="Lihat Lainnya"
                            type="primary"
                        /> -->
                    </div>

                    <div class="width width-full padding padding-top-30-px padding-bottom-30-px border-bottom">
                        <AppText :type="'bold'" style="margin-bottom: 10px;">Pengiriman</AppText>
                        <div class="display-flex margin margin-bottom-15-px">
                            <div style="width: 30px; height: 30px; margin-right: 20px; border-radius: 100%; background-color: #ccc;"></div>
                            <div style="width: calc(100% - 50px);">
                                <AppText type="bold">SiCepat - Regular Package (Estimasi tiba 11 Feb - 12 Feb)</AppText>
                                <AppText class="margin margin-bottom-15-px">No. Resi: 000476843993</AppText>

                                <div class="display-flex">
                                    <AppText style="margin-right: 10px;">Dikirim kepada : </AppText>
                                    <AppText type="bold">USER RECEIVER</AppText>
                                </div>
                                <AppText type="normal">Cibodas, Lembang, Kabupaten Bandung Barat, Jawa Barat, 40391 [Tokopedia Note: Desa Cibodas Kp. Areng RW 07 RT 02]</AppText>
                                <AppText type="normal">Lembang Kab. Bandung Barat, 40391</AppText>
                                <AppText type="normal">Jawa Barat</AppText>
                                <AppText type="normal">Telp: 6289699181669</AppText>
                            </div>
                        </div>
                    </div>

                    <div class="width width-full padding padding-top-30-px padding-bottom-30-px border-bottom">
                        <AppText :type="'bold'" style="margin-bottom: 10px;">Pembayaran</AppText>
                        <div class="display-flex margin margin-bottom-15-px">
                            <div style="width: 30px; height: 30px; margin-right: 20px; border-radius: 100%; background-color: #ccc;"></div>
                                <div style="width: calc(100% - 50px);">
                                    <div class="display-flex space-between margin margin-bottom-5-px">
                                    <AppText>Total Harga (1 produk)</AppText>
                                    <AppText :type="'bold'">Rp 150.000</AppText>
                                </div>
                                <div class="display-flex space-between margin margin-bottom-5-px">
                                    <AppText>Total Ongkos Kirim (200 Gr)</AppText>
                                    <AppText :type="'bold'">GRATIS</AppText>
                                </div>
                                <div class="display-flex space-between margin margin-bottom-5-px">
                                    <AppText>Promo</AppText>
                                    <AppText :type="'bold'">Rp 20.000</AppText>
                                </div>
                                <div class="display-flex space-between margin margin-bottom-5-px">
                                    <AppText>Biaya Penanganan</AppText>
                                    <AppText :type="'bold'">Rp 22.000</AppText>
                                </div>
                                <div class="display-flex space-between margin margin-bottom-5-px">
                                    <AppText>Total Bayar</AppText>
                                    <AppText :type="'bold'">Rp 152.000</AppText>
                                </div>
                                <div class="display-flex space-between margin margin-bottom-5-px">
                                    <AppText>Metode Pembayaran</AppText>
                                    <AppText :type="'bold'">OVO</AppText>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="width width-100 margin margin-top-30-px">
                        <AppText :type="'bold'" style="margin-bottom: 5px;">Catatan</AppText>
                        <AppWrapper style="width: 100%; margin-bottom: 0;">
                            <AppText >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</AppText>
                        </AppWrapper>
                    </div>
                </div>
                <div class="width width-35">
                    <div class="width width-90" style="margin-left: 10%;">
                        <div class="border-full padding padding-15-px">
                            <AppText :type="'bold'" style="margin-bottom: 5px;">Status Pesanan</AppText>
                            <AppText style="margin-bottom: 20px;">Menunggu Konfirmasi</AppText>

                            <AppButton
                                routeName="tracking"
                                title="Lacak Pesanan"
                                type="main"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppWrapper from '../../modules/AppWrapper'
import AppButton from '../../modules/AppButton'
import AppText from '../../modules/AppText'
import AppCardCharts from '../../modules/AppCardCharts'

export default {
    name: 'product',
    data () {
        return {
            data: [
                {
                    id: 1,
                    title: 'Name of cake that will selling',
                    note: 'Lorem ipsum dolor sit, amet consectetur.',
                    price: 'IDR 150 K',
                    toping: 'toping 1, toping 2',
                    qty: '1 produk'
                },
                {
                    id: 1,
                    title: 'Name of cake that will selling',
                    note: 'Lorem ipsum dolor sit, amet consectetur.',
                    price: 'IDR 150 K',
                    toping: 'toping 1, toping 2',
                    qty: '1 produk'
                }
            ]
        }
    },
    components: {
        AppWrapper,
        AppButton,
        AppText,
        AppCardCharts
    },
    methods: {
        onRegister () {
            console.log('REGISTER')
        }
    },
}
</script>
