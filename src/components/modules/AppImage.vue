<template>
    <div id="AppImage" class="display-flex">
        <div class="width width-100-px">
            <div class="image image-100px border-full">
                <img :src="this.image" alt="" />
                <button v-if="this.image !== '' ? this.isEnable ? true : false : false" class="remove" title="remove image" @click="onRemove">
                    <i class="fa fa-1x fa-times" />
                </button>
            </div>
        </div>
        <div style="padding-left: 15px; padding-top: 5px;">
            <div v-if="this.isEnable" class="field-label">Choose / change image</div>
            <input 
                v-if="this.isEnable"
                type="file" 
                placeholder="" 
                name="image" 
                id="image"
                ref="file"
                accept="image/*"
                @change="previewFiles">
            <!-- <label for="image" v-if="!visibleUploadButton" class="btn btn-sekunder" title="choose image">
                Choose Image
            </label> -->
            <button v-if="visibleUploadButton" class="btn btn-main btn-full" title="upload image" style="margin-top: 10px;" @click="onUploadImage">
                Upload Image
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppImage',
    data () {
        return {
            formImage: '',
            visibleUploadButton: false
        }
    },
    mounted () {
        this.$refs.file.value = null
    },
    props: {
        image: {
            type: String,
            required: true
        },
        isEnable: {
            type: Boolean,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        },
        onRemove: {
            type: Function,
            required: false
        },
        onUpload: {
            type: Function,
            required: false
        }
    },
    methods: {
        previewFiles(event) {
            const file = event.target.files[0]
            this.formImage = file
            this.visibleUploadButton = true
            console.log('file', file)
        },
        onUploadImage() {
            this.onUpload(this.formImage)
        }
    },
    watch: {
        image: function (props, prevProps) {
            // if (props) {
            //     this.formImage = props
            // } else {
            //     this.formImage = []
            // }
            // console.log('image', props)
            this.$refs.file.value = null
            this.visibleUploadButton = false
        }
    }
}
</script>