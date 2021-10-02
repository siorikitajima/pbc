<template>
  <div class="wrapper">
      <div class="modal">
        <div class="loadingSpinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
/** spinner **/
    .modal {
        width: 100%;
        height: 100%;
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
		background: #666;
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