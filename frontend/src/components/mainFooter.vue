<template>
        <div class="footer">
            <div class="footer__Content">
                <a href="#">
                    <p class="footer__Text">A propos</p>
                </a>
            </div>
            <div class="footer__Content">
                <a href="#">
                    <p class="Footer__Text">Mentions légales</p>
                </a>
            </div>
            <div class="footer__Content">
                <a href="mailto:email@example.com">Contact</a>
            </div>
        </div>
</template>

<script>
export default {
    name: "mainFooter",
};
</script>

<style lang="scss" scoped>
.footer {
    background-color: #2b2e2c;
    padding: 0.5rem 1.5rem 1rem 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
        &__Content{
            display:flex;
            color: white;
            align-items: center;
            }
            &__heading{
                color: white;
                padding-bottom: 0.7rem;
                font-weight: 500;
                @media screen and (min-width: 750px){
                    margin-left: 6%;
                    }
                }
                    &__Text{
                        margin : 0rem 0rem 0rem 0rem;
                    }
}

.a {
    text-decoration: none;
}
</style>