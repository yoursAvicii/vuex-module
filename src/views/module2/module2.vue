<template>
    <div>   
        模块二{{myname}}
    </div>
</template>
<script>
export default {
    name:"module2",
    isVuex:true,
    data(){
        return{
            myname:''
        }
    },
    created(){
        try{
            console.log(this.$store.state.module2);
            this.myname = this.$store.state.module2.name;
        }catch{
            console.log('还未获取')
        }
    },
    
}
</script>