<template>
<div>
    <div class="loadingPanelWrapper">

        <div class="loadingWrapper">
            <div class="icon">
                <!-- <img :src="require(`~/assets/images/global/loadingIcon.svg`)" alt="loading"> -->
                <div class="loadingSpinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>

    </div>
</div>
</template>

<script>

export default {
    name: 'PanelLoading',
    methods: {
        closeLoadingP() {
            this.$store.commit('CLOSE_TUTORIAL')
        }
    }
}
</script>

<style scoped>
.loadingPanelWrapper {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0; left: 0;
    background: #000000aa;
    z-index: 9000;
}
.loadingWrapper {
    width: fit-content;
    height: fit-content;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: calc(100% - 10px);
}
.loadingWrapper .icon, .loadingWrapper .icon img {
    width: 140px;
    height: 140px;
    margin: 0;
}

@media(max-width: 800px) {
    .loadingWrapper {
        width: fit-content;
        height: fit-content;
        /* top: 80px;
        left: unset;
        transform: unset; */
        text-align: center;
        max-width: unset;
        display: flex;
    }
    .loading {
        width: fit-content;
        height: fit-content;
    }
}

	.loadingSpinner {
		position: relative;
		width: 80px;
		height: 80px;
		margin: 10vh auto;
	}
	.loadingSpinner div {
		position: absolute;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: #ddd;
		animation: loadingSpinner 1.2s linear infinite;
	}
	.loadingSpinner div:nth-child(1) {
		top: 8px;
		left: 8px;
		animation-delay: 0s;
	}
	.loadingSpinner div:nth-child(2) {
		background-color: #0092C5;
		top: 8px;
		left: 32px;
		animation-delay: -0.4s;
	}
	.loadingSpinner div:nth-child(3) {
		top: 8px;
		left: 56px;
		animation-delay: -0.8s;
	}
	.loadingSpinner div:nth-child(4) {
		background-color: #0092C5;
		top: 32px;
		left: 8px;
		animation-delay: -0.4s;
	}
	.loadingSpinner div:nth-child(5) {
		top: 32px;
		left: 32px;
		animation-delay: -0.8s;
	}
	.loadingSpinner div:nth-child(6) {
		background-color: #0092C5;
		top: 32px;
		left: 56px;
		animation-delay: -1.2s;
	}
	.loadingSpinner div:nth-child(7) {
		top: 56px;
		left: 8px;
		animation-delay: -0.8s;
	}
	.loadingSpinner div:nth-child(8) {
		background-color: #0092C5;
		top: 56px;
		left: 32px;
		animation-delay: -1.2s;
	}
	.loadingSpinner div:nth-child(9) {
		top: 56px;
		left: 56px;
		animation-delay: -1.6s;
	}
	@keyframes loadingSpinner {
		0%, 100% { opacity: 1;}
		50% { opacity: 0.5;}
	}
</style>