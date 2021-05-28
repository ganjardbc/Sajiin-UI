<template>
    <div id="App">
        <AppMobileLayout :title="'Tables'">
            <div class="fonts fonts-22 semibold black" style="margin-bottom: 20px;">Tables</div>
        </AppMobileLayout>
    </div>
</template>
<script>
import AppMobileLayout from '../../modules/AppMobileLayout'

export default {
    name: 'App',
    components: {
        AppMobileLayout
    }
}
</script>